package tn.esprit.healthcare.Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.healthcare.Entities.Thread;

@Repository
public interface ThreadRepository extends CrudRepository<Thread,Long> {

}
