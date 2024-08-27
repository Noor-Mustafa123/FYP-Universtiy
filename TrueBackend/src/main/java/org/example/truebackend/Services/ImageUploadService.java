package org.example.truebackend.Services;


import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;


@Service
public class ImageUploadService {

    private static final String IMUGUR_UPLOAD_URL = "https://api.imgur.com/3/image";
    private static final String IMGUR_ACCESS_TOKEN = "4179db0babf33ce59640b5356250f8c15456f7bd";

    public String imageUploadMethod(MultipartFile file) throws IOException, InterruptedException {


//    Convert image ot encoded string
//    Base64 encoding is used to convert binary data into a text format. This is useful for transmitting binary data over text-based protocols such as HTTP.
        byte[] imageBytes = file.getBytes();
        String encodedImage = Base64.getEncoder().encodeToString(imageBytes);


        HttpRequest httpRequest = HttpRequest.newBuilder()
                .header("Authorization", "Bearer " + IMGUR_ACCESS_TOKEN)
                .header("Content-Type", "application/json")
                .uri(URI.create(IMUGUR_UPLOAD_URL))
                .POST(HttpRequest.BodyPublishers.ofString("{\"image\":\"" + encodedImage + "\"}"))
                .build();

        HttpClient httpClient = HttpClient.newHttpClient();


        HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());

        String responseBody = response.body();

        return  readURL(responseBody);




    }


    public String readURL(String responseBody) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();

//   instead of using hte readValue and passing in a jsonParser we used another approach to deserialie the json rigjt?
//        so i can get specific values form the json and i dont have ot map the json into an object first correct ?
     JsonNode jsonNode =  objectMapper.readTree(responseBody);
        return jsonNode.path("data").path("link").asText();

    }

}