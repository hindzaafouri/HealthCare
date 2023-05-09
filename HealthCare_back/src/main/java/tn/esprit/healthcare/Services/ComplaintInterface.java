package tn.esprit.healthcare.Services;

import tn.esprit.healthcare.Entities.Complaint;

import java.util.List;

public interface ComplaintInterface {
    Complaint addComplaint(Complaint complaint, Long userId);

    List<Complaint> getAllComplaints();

    Complaint updateComplaint(Complaint complaint);

    Complaint retrieveComplaint(int idComplaint);

    void removeComplaint(Complaint complaint);

    List<Complaint> advancedSearch(String subject,String state);




}
