package tn.esprit.healthcare.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.healthcare.Entities.Thread;
import tn.esprit.healthcare.Entities.Topic;
import tn.esprit.healthcare.Services.IThreadService;

import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/thread-op")

public class ThreadController {

    @Autowired
    IThreadService threadService ;

    @PostMapping("/add-thread")
    public ResponseEntity<Void> addUpdateThread (@RequestBody Thread thread) {
        threadService.addUpdateThread(thread);
        return ResponseEntity.status(HttpStatus.CREATED).build() ;
    }

    @DeleteMapping("/delete-thread/{id}")
    public ResponseEntity<String> deleteThread (@PathVariable long id) {
        Thread thread = threadService.findThreadById(id) ;
        threadService.deleteThread(thread);
        return ResponseEntity.ok("Thread "+id+" Deleted successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Thread> getThreadById (@PathVariable long id) {
        Thread thread = threadService.findThreadById(id) ;
        return ResponseEntity.ok(thread) ;
    }

    @GetMapping
    public ResponseEntity<Iterable<Thread>> getThreads () {
        Iterable<Thread> threads = threadService.findAll();
        return ResponseEntity.ok(threads) ;
    }

    @GetMapping("/thread-byTopic/{topic}")
    public Set<Thread> getThreadByTopic (@PathVariable Topic topic) {
        return threadService.findThreadByTopic(topic) ;
    }

    @GetMapping("thread-byKeyWord/{keyword}")
    public Set<Thread> getThreadByKeyWord (@PathVariable String keyword) {
        return threadService.findThreadByKeyWord(keyword) ;
    }



    @PostMapping("up/{id}")
    public ResponseEntity<Void> upThread (@PathVariable long id) {
        threadService.upThread(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("down/{id}")
    public ResponseEntity<Void> downThread (@PathVariable long id) {
        threadService.downThread(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/topics")
    public List<String> getTopics () {
        return threadService.getTopics();
    }

    @GetMapping("/threads-ByVotes")
    public ResponseEntity<List<Thread>> getThreadsSortedByVotes () {
        List<Thread> threads = threadService.getThreadsSortedByVotes() ;
        return ResponseEntity.ok(threads) ;
    }


}
