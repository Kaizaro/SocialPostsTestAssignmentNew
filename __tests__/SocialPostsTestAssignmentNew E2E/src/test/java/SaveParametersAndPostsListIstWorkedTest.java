import io.appium.java_client.MobileElement;
import io.appium.java_client.android.connection.ConnectionStateBuilder;
import io.qameta.allure.Description;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;
import org.testng.Assert;
import org.testng.annotations.Test;

public class SaveParametersAndPostsListIstWorkedTest extends BaseMethods {


    @Test
    public void testSaveParametersAndPostsListIstWorked() {
        StartPage startPage = new StartPage(driver);
        PostsPage postsPage = new PostsPage(driver);
        startPage.saveButton.click();
        Assert.assertEquals(postsPage.postsHeader.getText(), "Posts list");
        Assert.assertTrue(postsPage.postDate.isDisplayed());
        Assert.assertTrue(postsPage.authorName.isDisplayed());
        Assert.assertTrue(postsPage.postBody.isDisplayed());
    }

}
