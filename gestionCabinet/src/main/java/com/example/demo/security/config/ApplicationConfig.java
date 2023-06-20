package com.example.demo.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.exeption.UserNotFoundExeption;
import com.example.demo.repository.UtilisateurRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor

public class ApplicationConfig {
	private final UtilisateurRepository utilisateurRepository;

	@Bean
	public UserDetailsService userDetailsService() {
		return username -> utilisateurRepository.findByEmail(username)
				.orElseThrow(() -> new UserNotFoundExeption("User not found"));
	}
	
	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authnProvider  =new DaoAuthenticationProvider();
		authnProvider.setUserDetailsService(userDetailsService());
		authnProvider.setPasswordEncoder(passwordEncoder());
		return authnProvider;
	}
	@Bean
	public AuthenticationManager authenticationManager (AuthenticationConfiguration config) throws Exception{
		return config.getAuthenticationManager();
		
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
