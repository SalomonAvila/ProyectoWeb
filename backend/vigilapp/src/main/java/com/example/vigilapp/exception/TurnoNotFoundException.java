package com.example.vigilapp.exception;

public class TurnoNotFoundException extends RuntimeException {
    public TurnoNotFoundException(String message) {
        super(message);
    }
}