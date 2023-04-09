package tn.esprit.healthcare.Services;

import tn.esprit.healthcare.Entities.Thread;
import tn.esprit.healthcare.Entities.Topic;
import tn.esprit.healthcare.Repositories.ThreadRepository;

import java.util.List;
import java.util.Set;

public interface IThreadService {

    public void addUpdateThread (Thread thread) ;

    public void deleteThread (Thread thread) ;

    public Set<Thread> findThreadByTopic (Topic topic) ;

    public Thread findThreadById(Long id) ;

    public Set<Thread> findThreadByKeyWord (String keyword) ;

    public Iterable<Thread> findAll () ;

    public List<String> getTopics () ;

    public void upThread (Long id) ;
    public void downThread (Long id) ;

    public List<Thread> getThreadsSortedByVotes() ;


}
