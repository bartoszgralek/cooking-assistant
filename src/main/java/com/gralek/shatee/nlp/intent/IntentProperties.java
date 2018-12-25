package com.gralek.shatee.nlp.intent;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties("nlp")
public class IntentProperties {

    private boolean train;
}
