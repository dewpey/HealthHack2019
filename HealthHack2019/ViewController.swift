//
//  ViewController.swift
//  HealthHack2019
//
//  Created by Drew Patel on 7/20/19.
//  Copyright © 2019 Drew Patel. All rights reserved.
//

import UIKit
import FirebaseDatabase
class ViewController: UIViewController {
    var ref: DatabaseReference!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        ref = Database.database().reference().child("status")
        ref.observe(DataEventType.value, with: { (snapshot) in
            let postDict = snapshot.value as? [String : AnyObject] ?? [:]
            if(postDict["bob"] as! Int == 1){
                self.performSegue(withIdentifier: "toDelivered", sender: nil)
                //self.ref.removeAllObservers()
            }
        })
        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), for: UIBarMetrics.default)
        self.navigationController?.navigationBar.shadowImage = UIImage()
        // Do any additional setup after loading the view.
    }


}

