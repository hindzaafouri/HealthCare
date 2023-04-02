package tn.esprit.healthcare.Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.healthcare.Entities.Answer;

@Repository
public interface AnswerRepository extends CrudRepository<Answer,Long> {
}
