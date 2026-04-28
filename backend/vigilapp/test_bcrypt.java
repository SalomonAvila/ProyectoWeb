import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class test_bcrypt {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "user123";
        String hashed = encoder.encode(password);
        System.out.println("Hashed password: " + hashed);
        System.out.println("Matches: " + encoder.matches(password, hashed));
        
        // Test the old hash
        String oldHash = "$2a$10$8nodQVJ99i8y6zj5T6Je1.cZfn8qEHWiI.t0CLQhOOj4ZtLoIM0j.";
        System.out.println("Old hash matches: " + encoder.matches(password, oldHash));
    }
}
