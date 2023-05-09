package tn.esprit.healthcare.Entities;
import java.io.Serializable;
import java.util.Date;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import lombok.experimental.FieldDefaults;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Complaint  {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int idComplaint;
    private String subject;
    private String content;
    private String state;
    private String date;
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    @JsonIgnore
    @ManyToOne
    User user ;






}
