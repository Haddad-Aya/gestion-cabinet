package com.example.demo.security.auth;

import com.example.demo.enums.Role;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {
	@JsonProperty("accessToken")
	private String accessToken;
	private Long id;
	
	@JsonProperty("refreshToken")
	private String refreshToken;
	private Role role;
}
