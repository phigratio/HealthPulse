package com.healthpulse.AuthSection.event;

import com.healthpulse.AuthSection.entity.User;
import com.healthpulse.AuthSection.payloads.UserDto;
import org.springframework.context.ApplicationEvent;

public class OnRegistrationCompleteEvent extends ApplicationEvent {
    public final User user;

    public OnRegistrationCompleteEvent(User user) {
        super(user);
        this.user = user;
    }

    public User getUser() {
        return user;
    }


}
