package tn.esprit.healthcare.Controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import tn.esprit.healthcare.Entities.Complaint;
import tn.esprit.healthcare.Services.ComplaintService;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
@RequestMapping("/api")
@RestController
public class ComplaintController {

    public ComplaintService complaintService;
    @Autowired
    private JavaMailSender emailSender;
    @PostMapping("/addComplaint")
    @ResponseBody
    public Complaint addComplaint (@RequestBody Complaint complaint, @RequestParam Long userId) {
        return complaintService.addComplaint(complaint, userId);

    }



    @PutMapping("{idComplaint}")
    public Complaint updateComplaint(@PathVariable int idComplaint, @RequestBody Complaint complaint) {
        complaint.setIdComplaint(idComplaint);
        Complaint comp= complaintService.updateComplaint(complaint);
        if ( comp.getState().toString().equals("treated")) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("rmatoussi3@gmail.com");
            message.setSubject("Complaint for something");
            message.setText("Dear Rihem, your complaint has been under treamtment");
            emailSender.send(message);
        }
        return complaintService.updateComplaint(complaint);
    }

    @DeleteMapping("{idComplaint}")
    public void removeComplaint(@PathVariable int idComplaint) {
        Complaint complaint = complaintService.retrieveComplaint(idComplaint);
        if (complaint != null) {
            complaintService.removeComplaint(complaint);

        }
    }

    @GetMapping("/getComplaints")
    public List<Complaint> getAllComplaint(){
        return complaintService.getAllComplaints();
    }

    @GetMapping("{idComplaint}")
    public Complaint retrieveComplaint(@PathVariable int idComplaint) {
        Complaint complaint = complaintService.retrieveComplaint(idComplaint);
        if (complaint != null) {}
        return complaint;
    }

    @GetMapping("/search")
    public List<Complaint> advancedSearch(
            @RequestParam(name = "subject", required = false) String subject,
            @RequestParam(name = "state", required = false) String state){

        return complaintService.advancedSearch(subject,state);
    }

    @GetMapping("/sorting")
    public List<Complaint> SortComplaints(){
        List<Complaint> complaintList=complaintService.getAllComplaints();
        Collections.sort(complaintList, Comparator.comparing(Complaint::getDate));
        return complaintList;

    }




}
