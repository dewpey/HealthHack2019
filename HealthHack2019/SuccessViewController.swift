//
//  SuccessViewController.swift
//  HealthHack2019
//
//  Created by Drew Patel on 7/21/19.
//  Copyright © 2019 Drew Patel. All rights reserved.
//

import UIKit
import NotificationBannerSwift
class SuccessViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        let banner = NotificationBanner(title: "Message from Dr. Garcia", subtitle: "Have your recieved your medication?", style: .info)
        
        banner.onTap = {
            self.performSegue(withIdentifier: "toChat", sender: nil)
        }
        
        banner.show()
        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), for: UIBarMetrics.default)
        self.navigationController?.navigationBar.shadowImage = UIImage()
        
        
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
