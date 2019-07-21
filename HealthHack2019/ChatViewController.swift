//
//  ChatViewController.swift
//  HealthHack2019
//
//  Created by Drew Patel on 7/20/19.
//  Copyright © 2019 Drew Patel. All rights reserved.
//

import UIKit
import MessageKit
import MessageInputBar
import ApiAI
class ChatViewController: MessagesViewController {
    var messages: [Message] = []
    var member: Member!
    var ai: Member!
    override func viewDidLoad() {
        super.viewDidLoad()
        member = Member(name: "You", color: .blue, image: UIImage(named: "unknown")!)
        ai = Member(name: "Dr. Garcia", color: .red, image: UIImage(named:"5919")!)
        messagesCollectionView.messagesDataSource = self
        messagesCollectionView.messagesLayoutDelegate = self
        messageInputBar.delegate = self
        messagesCollectionView.messagesDisplayDelegate = self
        
        var initialMessage = Message(member: ai, text: "Have you recieved your medication?", messageId: UUID().uuidString)
        messages.append(initialMessage)
        messagesCollectionView.reloadData()
        messagesCollectionView.scrollToBottom(animated: true)
        // Do any additional setup after loading the view.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}

extension ChatViewController: MessagesDataSource {
    func numberOfSections(
        in messagesCollectionView: MessagesCollectionView) -> Int {
        return messages.count
    }
    
    func currentSender() -> Sender {
        return Sender(id: member.name, displayName: member.name)
    }
    
    func messageForItem(
        at indexPath: IndexPath,
        in messagesCollectionView: MessagesCollectionView) -> MessageType {
        
        return messages[indexPath.section]
    }
    
    func messageTopLabelHeight(
        for message: MessageType,
        at indexPath: IndexPath,
        in messagesCollectionView: MessagesCollectionView) -> CGFloat {
        
        return 12
    }
    
    func messageTopLabelAttributedText(
        for message: MessageType,
        at indexPath: IndexPath) -> NSAttributedString? {
        
        return NSAttributedString(
            string: message.sender.displayName,
            attributes: [.font: UIFont.systemFont(ofSize: 12)])
    }
}

extension ChatViewController: MessagesLayoutDelegate {
    func heightForLocation(message: MessageType,
                           at indexPath: IndexPath,
                           with maxWidth: CGFloat,
                           in messagesCollectionView: MessagesCollectionView) -> CGFloat {
        
        return 0
    }
}

extension ChatViewController: MessagesDisplayDelegate {
    func configureAvatarView(
        _ avatarView: AvatarView,
        for message: MessageType,
        at indexPath: IndexPath,
        in messagesCollectionView: MessagesCollectionView) {
        
        let message = messages[indexPath.section]
        let color = message.member.color
        avatarView.backgroundColor = color
        avatarView.image = message.member.image
        
    }
}

extension ChatViewController: MessageInputBarDelegate {
    func messageInputBar(
        _ inputBar: MessageInputBar,
        didPressSendButtonWith text: String) {
        
        let newMessage = Message(
            member: member,
            text: text,
            messageId: UUID().uuidString)
        
        let request = ApiAI.shared().textRequest()
        request?.query = text
        
        request?.setMappedCompletionBlockSuccess({ (request, response) in
            let response = response as! AIResponse
            print(response.result.fulfillment.speech as? String)
            let aiResponse = Message(member: self.ai, text: response.result.fulfillment.speech as? String ?? "", messageId: UUID().uuidString)
            self.messages.append(aiResponse)
            self.messagesCollectionView.reloadData()
            self.messagesCollectionView.scrollToBottom(animated: true)
        }, failure: { (request, error) in
            print(error)
        })
        
        ApiAI.shared()?.enqueue(request)
        
        print(newMessage)
        
        messages.append(newMessage)
        inputBar.inputTextView.text = ""
        messagesCollectionView.reloadData()
        messagesCollectionView.scrollToBottom(animated: true)
    }
}
