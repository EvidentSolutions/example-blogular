package fi.evident.blogular.core.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.jetbrains.annotations.NotNull;

@JsonIgnoreProperties({"slug", "author", "publishTime"})
public final class EditedPostData {

    @NotNull
    public String title = "";

    @NotNull
    public String body  = "";
}
