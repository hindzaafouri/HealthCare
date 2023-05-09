package tn.esprit.healthcare.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tn.esprit.healthcare.Entities.Complaint;
import tn.esprit.healthcare.Entities.User;
import tn.esprit.healthcare.Repositories.ComplaintRepo;
import tn.esprit.healthcare.Repositories.UserRepository;

import java.util.List;
@Service
public class ComplaintService implements ComplaintInterface{

    @Autowired
    public ComplaintRepo ComplaintRepo;
    public JavaMailSender mailSender;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Complaint addComplaint(Complaint complaint , Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        complaint.setUser(user);
        ComplaintRepo.save(complaint);
        return complaint;
    }

    @Override
    public List<Complaint> getAllComplaints() {
        return (List<Complaint>) ComplaintRepo.findAll();
    }

    @Override
    public Complaint updateComplaint(Complaint complaint) {
        Complaint existingComplaint = ComplaintRepo.findById(Math.toIntExact(complaint.getIdComplaint())).get();
        existingComplaint.setContent(complaint.getContent());
        existingComplaint.setSubject(complaint.getSubject());
        existingComplaint.setDate(complaint.getDate());
        existingComplaint.setState(complaint.getState());
        return ComplaintRepo.save(existingComplaint);
    }

    @Override
    public Complaint retrieveComplaint(int idComplaint) {
        return ComplaintRepo.findById(Math.toIntExact(idComplaint)).orElse(null);
    }

    @Override
    public void removeComplaint(Complaint complaint) {
        ComplaintRepo.delete(complaint);
    }

    @Override
    public List<Complaint> advancedSearch(String subject, String state) {
        if (subject == null && state == null) {
            return getAllComplaints();
        } else if (subject != null && state == null  ) {
            return ComplaintRepo.findComplaintBySubject(subject);
        } else if (subject == null && state != null ) {
            return ComplaintRepo.findComplaintByState(state);
        }
        else {
            return ComplaintRepo.findComplaintBySubjectAndState(subject,state);
        }
    }


}
