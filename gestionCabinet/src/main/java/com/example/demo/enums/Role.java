package com.example.demo.enums;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import static com.example.demo.enums.Permission.*;

@RequiredArgsConstructor
public enum Role {
	
    ADMIN(
    		Set.of(
    				ADMIN_READ,
    				ADMIN_UPDATE,
    				ADMIN_CREATE,
    				ADMIN_DELETE
    				)
    		),
    USER(
    		Set.of(
    				USER_READ,
    				USER_UPDATE,
    				USER_CREATE,
    				USER_DELETE
    				)
    		)
    ;
	
	@Getter
	private final Set<Permission> permissions; 
	
	public List<SimpleGrantedAuthority> getAuthorities(){
		var authorities = getPermissions()
		.stream()
		.map(permission -> new SimpleGrantedAuthority(permission.name()))
		.collect(Collectors.toList());
		authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
		return authorities;
	}
}
