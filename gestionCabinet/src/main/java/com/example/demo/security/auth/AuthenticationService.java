package com.example.demo.security.auth;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.entities.*;
import com.example.demo.enums.Role;
import com.example.demo.repository.CodeMdpRepository;
import com.example.demo.repository.UtilisateurRepository;
import com.example.demo.security.config.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
//javax.servlet.http.HttpServletResponse

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	
	private final UtilisateurRepository utilisateurRepository;
	private final CodeMdpRepository codeMdpRepository;
	private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager; 
    
    @Autowired
    private JavaMailSender mailSender;
    
	public AuthenticationResponse registerPatient(RegisterPatientRequest request) {
		/*utilisateurRepository.findByEmail(request.getEmail())
				.orElseThrow();*/
		var user = Patient.builder()
				.nom(request.getNom())
				.prenom(request.getPrenom())
				.email(request.getEmail())
				.telephone(request.getTelephone())
				.adr(request.getAdr())
				.civilite(request.getCivilite())
				.idCnam(request.getIdCnam())
				.codePostal(request.getCodePostal())
				.sexe(request.getSexe())
				.dateNaissance(request.getDateNaissance())
				.role(Role.USER)
				.archive(false)
				.motDePasse(passwordEncoder.encode(request.getMotDePasse()))
				.build();
	 utilisateurRepository.save(user);
	var jwtToken =jwtService.generateToken(user);
	var refreshToken=jwtService.generateRefreshToken(user);
	//saveUserToken(savedUser,jwtToken);
		return AuthenticationResponse.builder()
				.accessToken(jwtToken)
				.refreshToken(refreshToken)
				.id(user.getId())
				.build();
	}
	
	public AuthenticationResponse registerMedecin(RegisterMedecinRequest request) {
	/*	utilisateurRepository.findByEmail(request.getEmail())
				.orElseThrow();*/
		var verif = Medecin.builder()
				.nom(request.getNom())
				.prenom(request.getPrenom())
				.email(request.getEmail())
				.adr(request.getAdr())
				.codePostal(request.getCodePostal())
				.nCin(request.getNCin())
				.telephone(request.getTelephone())
				.nomCabinet(request.getNomCabinet())
				.role(Role.ADMIN)
				.motDePasse(passwordEncoder.encode(request.getMotDePasse()))
				.build();
	utilisateurRepository.save(verif);
	var jwtToken =jwtService.generateToken(verif); 
	var refreshToken=jwtService.generateRefreshToken(verif);
		return AuthenticationResponse.builder()
				.accessToken(jwtToken)
				.refreshToken(refreshToken)
				.role(verif.getRole())
				.id(verif.getId())
				.build();
	}

	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getEmail(),
						request.getMotDePasse()
						)
		);
		var user = utilisateurRepository.findByEmail(request.getEmail())
				.orElseThrow();
		var jwtToken =jwtService.generateToken(user); 
		var refreshToken = jwtService.generateRefreshToken(user);
        System.out.println(user.getId());
		return AuthenticationResponse.builder()
				.accessToken(jwtToken)
				.refreshToken(refreshToken)
				.role(user.getRole())
				.id(user.getId())
				.build();
	}

	public void refreshToken(
			HttpServletRequest request,
			HttpServletResponse response
	) throws java.io.IOException{
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if(authHeader == null ||!authHeader.startsWith(("Bearer "))){
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUserEmail(refreshToken);
        if(userEmail != null){
            var user=this.utilisateurRepository.findByEmail(userEmail).orElseThrow();
            if(jwtService.isTokenValid(refreshToken, user)){
               var token = jwtService.generateToken(user);
              // revokeAllToken(user);
               var authResponse = AuthenticationResponse.builder()
            		   .accessToken(token)
            		   .refreshToken(refreshToken)
            		   .role(user.getRole())
            		   .id(user.getId())
            		   .build();
               System.out.println(user.getId());
               new ObjectMapper().writeValue(response.getOutputStream(),authResponse);
            }
        }
	}
	public Utilisateur getUserByMail(String email) {
		Utilisateur newUser = utilisateurRepository.findByEmail(email).orElse(null);
		System.out.println(newUser);
		return newUser;
	} 


	public void sendMail(String email) {
		Random r= new Random();
		int rand = r.nextInt();
		System.out.println(rand);
		Utilisateur newUser = utilisateurRepository.findByEmail(email).orElse(null);
		CodeMdp newCode= new CodeMdp();
		int code=Math.abs(rand);
		newCode.setCodeMdp(Math.abs(code));
		newCode.setUser(newUser);
		codeMdpRepository.save(newCode);
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setFrom("ayyouta.aya.had@gmail.com");
		mail.setTo(email);
		mail.setText("Votre code pour réunitialiser votre mot de passe est  :  "+ code);
		mail.setSubject("Réunitialiser mot de passe");
		
		mailSender.send(mail);
		System.out.println(mail);
	} 
	public boolean verifCode(int codeMdp) {
		CodeMdp verif = codeMdpRepository.findByCodeMdp(codeMdp);
		if(verif != null) {
			return true;
		}
		else return false;
		
	}
	public void updateMdp(Utilisateur newU) {
		Medecin medecin = new Medecin();
		Patient patient = new Patient();
		Utilisateur findUser = utilisateurRepository.findByEmail(newU.getEmail()).orElse(null);
		System.out.println("user finding  :"+findUser);
		
		if(findUser instanceof Medecin) {
			medecin = (Medecin) findUser;
			medecin.setId(findUser.getId());
			medecin.setNom(medecin.getNom());
			medecin.setPrenom(medecin.getPrenom());
			medecin.setEmail(medecin.getEmail());
			medecin.setTelephone(medecin.getTelephone());
			medecin.setAdr(medecin.getAdr());
			medecin.setCodePostal(medecin.getCodePostal());
			medecin.setNCin(medecin.getNCin());
			medecin.setNomCabinet(medecin.getNomCabinet());
			medecin.setRole(Role.ADMIN);
			medecin.setMotDePasse(passwordEncoder.encode(newU.getMotDePasse()));
			Medecin find = utilisateurRepository.save(medecin);
			System.out.println("medecin après updating  :"+ find);
			codeMdpRepository.deleteAll();
		}
		else if(findUser instanceof Patient) {
			patient = (Patient) findUser;
			patient.setId(findUser.getId());
			patient.setNom(patient.getNom());
			patient.setPrenom(patient.getPrenom());
			patient.setEmail(patient.getEmail());
			patient.setTelephone(patient.getTelephone());
			patient.setAdr(patient.getAdr());
			patient.setCodePostal(patient.getCodePostal());
			patient.setSexe(patient.getSexe());
			patient.setDateNaissance(patient.getDateNaissance());
			patient.setCivilite(patient.getCivilite());
			patient.setArchive(patient.isArchive());
			patient.setRole(Role.USER);
			patient.setMotDePasse(passwordEncoder.encode(newU.getMotDePasse()));
			Patient find = utilisateurRepository.save(patient);
			System.out.println("patient après updating  :"+ find);
			codeMdpRepository.deleteAll();
		}
	}
}
