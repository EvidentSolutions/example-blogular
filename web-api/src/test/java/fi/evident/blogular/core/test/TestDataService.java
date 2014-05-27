package fi.evident.blogular.core.test;

import fi.evident.blogular.core.model.EditedPostData;
import fi.evident.blogular.core.model.NewPostData;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

@Service
public class TestDataService {

    @NotNull
    public NewPostData arbitraryNewPostData() {
        return arbitraryNewPostDataWithTitle("my title");
    }

    @NotNull
    public NewPostData arbitraryNewPostDataWithTitle(@NotNull String title) {
        NewPostData data = new NewPostData();
        data.title = title;
        data.body = "my post body";
        data.author = "my author";
        return data;
    }

    @NotNull
    public EditedPostData arbitraryEditedData() {
        EditedPostData data = new EditedPostData();
        data.title = "edited title";
        data.body = "edited body";
        return data;
    }
}
