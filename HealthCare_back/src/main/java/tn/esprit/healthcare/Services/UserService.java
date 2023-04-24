package tn.esprit.healthcare.Services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.healthcare.Entities.User;
import tn.esprit.healthcare.Payload.UserPrincipal;
import tn.esprit.healthcare.Repositories.UserRepository;

import java.util.List;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByemail(email);
        System.out.println(user.getEmail() + "         " +user.getPassword());
        UserPrincipal userPrincipal = new UserPrincipal(user);
        return userPrincipal;
    }

    @Transactional
    public void addUser(User user){
        userRepository.save(user);
    }

    public boolean ifEmailExist(String email){
        return userRepository.existsByEmail(email);
    }

    @Transactional
    public int getUserActive(String email){
        return userRepository.getActive(email);
    }

    @Transactional
    public String getPasswordByEmail(String email){
        return userRepository.getPasswordByEmail(email);
    }

    public User getUserByMail(String mail){
        return this.userRepository.findByemail(mail);
    }
    public void editUser(User user){
        this.userRepository.save(user);
    }

    public List<User> fetchSkieurList() {
        try {
            return userRepository.findAllPatients();
        } catch (DataAccessException ex) {
            throw new RuntimeException("Error fetching users: " + ex.getMessage(), ex);
        }
    }
}
