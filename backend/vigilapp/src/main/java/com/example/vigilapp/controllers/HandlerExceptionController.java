package com.example.vigilapp.controllers;
import java.util.*;

import org.springframework.web.bind.annotation.ExceptionHandler;

import com.example.vigilapp.exception.UsuarioNotFoundException;

public class HandlerExceptionController {

    @ExceptionHandler(UsuarioNotFoundException.class)
    public Map<String, String> handleUsuarioNotFoundException(UsuarioNotFoundException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Usuario no encontrado");
        errorResponse.put("message", ex.getMessage());
        return errorResponse;
    }
}
