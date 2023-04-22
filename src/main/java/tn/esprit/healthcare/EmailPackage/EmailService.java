package tn.esprit.healthcare.EmailPackage;

public interface EmailService {

    String sendSimpleMail(EmailDetails details);


    String sendMailWithAttachment(EmailDetails details);
}

