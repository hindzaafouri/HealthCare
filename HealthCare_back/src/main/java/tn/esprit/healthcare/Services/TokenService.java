package tn.esprit.healthcare.Services;

import com.auth0.jwt.JWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tn.esprit.healthcare.Payload.JwtLogin;
import tn.esprit.healthcare.Payload.JwtProperties;
import tn.esprit.healthcare.Payload.LoginResponse;
import tn.esprit.healthcare.Payload.UserPrincipal;

import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

@Service
public class TokenService {
    private AuthenticationManager authenticationManager;

    @Autowired
    public TokenService(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }


    private String generateToken(Authentication authResult) {

        // Grab principal
        UserPrincipal principal = (UserPrincipal) authResult.getPrincipal();
        System.out.println(principal.getUsername());

        // Create JWT Token
        String token = JWT.create()
                .withSubject(principal.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .sign(HMAC512(JwtProperties.SECRET.getBytes()));
        return token;
    }

    public LoginResponse login(JwtLogin jwtLogin) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtLogin.getEmail(),
                jwtLogin.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        String token = generateToken(authenticate);
        return new LoginResponse(jwtLogin.getEmail(),token);
    }
}
