package com.example.demo.security.auth;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Utilisateur;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
	
	private final AuthenticationService authenticationService;
	
	@PostMapping("/registerPatient")
	public ResponseEntity<AuthenticationResponse> registerPatient(
			@RequestBody RegisterPatientRequest request
			){
				return ResponseEntity.ok(authenticationService.registerPatient(request));
		
	}
	@PostMapping("/registerMedecin")
	public ResponseEntity<AuthenticationResponse> registerMedecin(
			@RequestBody RegisterMedecinRequest request
			){
				return ResponseEntity.ok(authenticationService.registerMedecin(request));
		
	}
	@PostMapping("/authenticate")
	public ResponseEntity<AuthenticationResponse> register(
			@RequestBody AuthenticationRequest request
			){
				return ResponseEntity.ok(authenticationService.authenticate(request));
		
	}
	
	@PostMapping("/refreshToken")
	public void refreshToken(
			HttpServletRequest request,
			HttpServletResponse response
			) throws IOException{
		authenticationService.refreshToken(request, response);
		
	}
	@GetMapping("/getUserByMail/{email}")
	public Utilisateur getUserByEmail(@PathVariable String email) {
		return authenticationService.getUserByMail(email);
	}
	 @PostMapping("/sendMail")
	 public void sendMail(@RequestBody String email) {
		  authenticationService.sendMail(email);
		  }
	 @GetMapping("/verifCode")
	 public boolean verifCode(
			 @RequestParam(name = "codeMdp") int codeMdp
			 ) {
		 return authenticationService.verifCode(codeMdp);
	 }
	 @PutMapping("/updateUser")
	 public void updateUser(
			 @RequestBody Utilisateur newUser
			 ) {
		 authenticationService.updateMdp(newUser);
	 }
}
