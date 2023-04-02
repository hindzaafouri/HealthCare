package tn.esprit.healthcare.Entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@ToString
@Entity
public class Comment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idComment ;
    private String comment ;

    @ManyToOne
    Answer answer ;

    /*@ManyToOne
    User user ; */
}
