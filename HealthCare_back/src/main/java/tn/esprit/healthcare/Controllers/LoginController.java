package tn.esprit.healthcare.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoginController {
    @RequestMapping("/login")
    public String loginPage(){
        return "login"; }
    @RequestMapping("/home")
    public String loginSubmit(){return "/layouts/dashboard"; }
}
