package tn.esprit.healthcare.Payload;

public class JwtProperties {
    public static final String SECRET = "MY-ESLAM.Khder";
    public static final int EXPIRATION_TIME = 5000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
}