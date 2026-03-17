package com.example.vigilapp.exception;

public class IncidenteNotFoundException extends RuntimeException {
    public IncidenteNotFoundException(String message) {
        super(message);
    }
}