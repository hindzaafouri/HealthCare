package tn.esprit.healthcare.Repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import tn.esprit.healthcare.Entities.Complaint;

import java.time.LocalDateTime;
import java.util.List;

public interface ComplaintRepo extends JpaRepository<Complaint,Integer> {
    List<Complaint> findComplaintBySubject(String subject);
    List<Complaint> findComplaintByState(String state);
    List<Complaint> findComplaintBySubjectAndState(String subject, String state);




}
