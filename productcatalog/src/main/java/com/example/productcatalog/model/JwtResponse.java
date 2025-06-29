package com.example.productcatalog.model;


import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class JwtResponse
{
    private  String jwtToken;
    private String username;
}
