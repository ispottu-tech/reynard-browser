

// MARK: - Prompt Handler (Reynard Enhanced Edition)

enum PromptEvents: String, CaseIterable {
    case prompt = "GeckoView:Prompt"
}

private func findTopViewController() -> UIViewController? {
    guard let window = UIApplication.shared.windows.first(where: { $0.isKeyWindow }),
          let root = window.rootViewController else {
        return nil
    }
    var top = root
    while let presented = top.presentedViewController {
        top = presented
    }
    return top
}

func newPromptHandler(_ session: GeckoSession) -> GeckoSessionHandler {
    let handler = GeckoSessionHandler(
        moduleName: "GeckoViewPrompter",
        events: PromptEvents.allCases.map(\.rawValue),
        session: session
    ) { @MainActor session, delegate, type, message in
        guard PromptEvents(rawValue: type) != nil else {
            throw GeckoHandlerError("unknown message \(type)")
        }

        let promptType = message?["type"] as? String ?? ""
        let title = message?["title"] as? String
        let msg = message?["message"] as? String

        switch promptType {
        case "alert":
            await withCheckedContinuation { (continuation: CheckedContinuation<Void, Never>) in
                let alert = UIAlertController(
                    title: title,
                    message: msg,
                    preferredStyle: .alert
                )
                alert.addAction(UIAlertAction(title: "OK", style: .default) { _ in
                    continuation.resume()
                })
                if let vc = findTopViewController() {
                    vc.present(alert, animated: true)
                } else {
                    continuation.resume()
                }
            }
            return ["prompt": [String: Any]()]

        case "button":
            let btnTitles = message?["btnTitle"] as? [String] ?? ["OK", "", "Cancel"]
            let result: Int = await withCheckedContinuation { continuation in
                let alert = UIAlertController(
                    title: title,
                    message: msg,
                    preferredStyle: .alert
                )

                if btnTitles.count > 2 && !btnTitles[2].isEmpty {
                    alert.addAction(UIAlertAction(title: btnTitles[2], style: .cancel) { _ in
                        continuation.resume(returning: 2)
                    })
                }
                if !btnTitles.isEmpty && !btnTitles[0].isEmpty {
                    alert.addAction(UIAlertAction(title: btnTitles[0], style: .default) { _ in
                        continuation.resume(returning: 0)
                    })
                }
                if btnTitles.count > 1 && !btnTitles[1].isEmpty {
                    alert.addAction(UIAlertAction(title: btnTitles[1], style: .default) { _ in
                        continuation.resume(returning: 1)
                    })
                }

                if alert.actions.isEmpty {
                    alert.addAction(UIAlertAction(title: "OK", style: .default) { _ in
                        continuation.resume(returning: 0)
                    })
                }

                if let vc = findTopViewController() {
                    vc.present(alert, animated: true)
                } else {
                    continuation.resume(returning: 2)
                }
            }
            return ["prompt": ["button": result]]

        case "text":
            let defaultValue = message?["value"] as? String ?? ""
            let result: String? = await withCheckedContinuation { continuation in
                let alert = UIAlertController(
                    title: title,
                    message: msg,
                    preferredStyle: .alert
                )
                alert.addTextField { textField in
                    textField.text = defaultValue
                }
                alert.addAction(UIAlertAction(title: "Cancel", style: .cancel) { _ in
                    continuation.resume(returning: nil as String?)
                })
                alert.addAction(UIAlertAction(title: "OK", style: .default) { _ in
                    let text = alert.textFields?.first?.text ?? ""
                    continuation.resume(returning: text)
                })
                if let vc = findTopViewController() {
                    vc.present(alert, animated: true)
                } else {
                    continuation.resume(returning: nil as String?)
                }
            }
            if let text = result {
                return ["prompt": ["text": text]]
            }
            return ["prompt": [String: Any]()]

        case "popup":
            return ["prompt": ["allow": true]]

        case "beforeUnload":
            return ["prompt": ["allow": true]]

        case "repost":
            return ["prompt": ["allow": true]]

        default:
            return ["prompt": [String: Any]()]
        }
    }
    handler.setDelegate(true as AnyObject)
    return handler
}
