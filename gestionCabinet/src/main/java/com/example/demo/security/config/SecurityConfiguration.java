package com.example.demo.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import static com.example.demo.enums.Permission.*;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
	private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/api/admin/**")
                .permitAll()
               /* .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET,"/api/admin/**").hasAuthority(ADMIN_READ.name())
                .requestMatchers(HttpMethod.POST,"/api/admin/**").hasAuthority(ADMIN_CREATE.name())
                .requestMatchers(HttpMethod.PUT,"/api/admin**").hasAuthority(ADMIN_UPDATE.name())
                .requestMatchers(HttpMethod.DELETE,"/api/admin**").hasAuthority(ADMIN_DELETE.name())
                  .requestMatchers("/api/user/**").hasRole("USER")
                .requestMatchers(HttpMethod.GET,"/api/user/**").hasAuthority(USER_READ.name())
                .requestMatchers(HttpMethod.POST,"/api/user/**").hasAuthority(USER_CREATE.name())
                .requestMatchers(HttpMethod.PUT,"/api/user**").hasAuthority(USER_UPDATE.name())
                .requestMatchers(HttpMethod.DELETE,"/api/user**").hasAuthority(USER_DELETE.name()) */
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();

    }
    /*   @Bean
    CorsConfigurationSource corsConfigurationSource() {
    	CorsConfiguration configuration = new CorsConfiguration();
    	configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
		configuration.setAllowedMethods(Arrays.asList("GET","POST"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
    }*/
}
