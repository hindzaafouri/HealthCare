package tn.esprit.healthcare.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@ToString
@Entity
public class Thread implements Serializable  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idThread ;
    private String titleThread ;

    @Column(columnDefinition = "int default 0")
    private int votes ;
    @Enumerated(EnumType.STRING)
    private Topic topicThread ;
    private String questionThread ;

    private LocalDateTime createdAt ;

    @OneToMany(cascade = CascadeType.ALL , mappedBy = "thread")
    @JsonIgnoreProperties("thread")
    private Set<Answer> answers ;

    /*@ManyToOne
    User user ; */
}
