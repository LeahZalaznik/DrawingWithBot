using System.Text.Json;
using System.Text;
using AiImageApi.Controllers;
using AiImageApi.Data.Models;

namespace AiImageApi.Services
{
    public interface IPromptService
    {
        Task<string> GetDrawingJsonAsync(PromptRequest request);
    }
    public class PromptService : IPromptService
    {
        private readonly HttpClient _httpClient;
        //להעביר לקובץ הגדרות
        private readonly string _apiKey = "AIzaSyDzxoCUkAe1yP1vKsyrqaDz0CJ3jNXjdrE"; 

        public PromptService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> GetDrawingJsonAsync(PromptRequest request)
        {
            var currentCanvasJson = JsonSerializer.Serialize(request.Canvas ?? new List<DrawingCommand>());
            var sb = new StringBuilder();



            sb.AppendLine("אתה מומחה מנוסה לגרפיקה וקטורית. המשימה שלך היא לתרגם בקשות משתמש לפקודות ציור JSON עבור קנבס.");

            sb.AppendLine("המטרה היא **לעדכן את הציור הקיים** באמצעות הוספה, שינוי או מחיקה של צורות.");

            sb.AppendLine("קואורדינטות (X, Y) מתחילות מ-0,0 בפינה השמאלית העליונה.");

            sb.AppendLine($"**גודל הקנבס הנוכחי:** רוחב = {request.CanvasWidth} פיקסלים, גובה = {request.CanvasHeight} פיקסלים.");

            sb.AppendLine("השתמש במימדים אלו כדי לחשב מיקומים יחסיים וקואורדינטות מדויקות.");

            sb.AppendLine();

            sb.AppendLine("---");

            sb.AppendLine();

            sb.AppendLine("**מצב הציור הנוכחי על הקנבס:**");

            sb.AppendLine("הנה רשימת הצורות המצוירות כרגע. השתמש במידע זה כדי לבצע שינויים מדויקים:");

            sb.AppendLine(currentCanvasJson);

            sb.AppendLine();

            sb.AppendLine("---");

            sb.AppendLine();

            sb.AppendLine("**הנחיות קפדניות לפלט JSON:**");

            sb.AppendLine("1.  **פורמט פלט:** חזור **אך ורק** מערך JSON תקני. אל תכלול שום טקסט, הסברים, הערות, או עיטוף בקוד נוסף מחוץ למבנה ה-JSON עצמו.");

            sb.AppendLine("2.  **פקודות במערך:** הפלט הוא תמיד **מערך** של אובייקטי פקודות. כל אובייקט במערך מייצג צורה חדשה, צורה שעודכנה, או צורה למחיקה.");

            sb.AppendLine("3.  **מזהה ייחודי (id) - חובה!**");

            sb.AppendLine("    * **עבור צורה קיימת שמשתנה:** השתמש ב-`\"id\"` המדויק של הצורה מתוך ה`מצב הציור הנוכחי`. אל תייצר ID חדש.");

            sb.AppendLine("    * **עבור צורה חדשה שנוספת:** צור `\"id\"` חדש וייחודי לגמרי (לדוגמה: `\"new-circle-7a2b\"`, `\"rect-xyz-456\"`).");

            sb.AppendLine("4.  **שמות צורות (name) - לשיפור זיהוי:** אם המשתמש מתייחס לצורה בשם מפורש (\"השמש\", \"העץ\"), הוסף או שמור את המאפיין `\"name\": \"[שם]\"` באובייקט הצורה. זה עוזר למודל לזהות אותה בבקשות עתידיות.");

            sb.AppendLine("5.  **צבעים:** השתמש בשמות צבעים נפוצים באנגלית בלבד (לדוגמה: \"red\", \"blue\", \"yellow\", \"black\", \"white\", \"green\", \"purple\", \"brown\", \"gray\").");

            sb.AppendLine("6.  **סוגי צורות ופרמטרים נתמכים:**");

            sb.AppendLine("    * **`circle`**: `{ \"type\": \"circle\", \"id\": \"...\", \"x\": [number], \"y\": [number], \"radius\": [number], \"fill\": \"[color]\", \"name\": \"[string, אופציונלי]\" }`");

            sb.AppendLine("    * **`rect`**: `{ \"type\": \"rect\", \"id\": \"...\", \"x\": [number], \"y\": [number], \"width\": [number], \"height\": [number], \"fill\": \"[color]\", \"name\": \"[string, אופציונלי]\" }`");

            sb.AppendLine("    * **`line`**: `{ \"type\": \"line\", \"id\": \"...\", \"x1\": [number], \"y1\": [number], \"x2\": [number], \"y2\": [number], \"stroke\": \"[color]\", \"strokeWidth\": [number], \"name\": \"[string, אופציונלי]\" }`");

            sb.AppendLine("    * **`ellipse`**: `{ \"type\": \"ellipse\", \"id\": \"...\", \"x\": [number], \"y\": [number], \"radiusX\": [number], \"radiusY\": [number], \"fill\": \"[color]\", \"name\": \"[string, אופציונלי]\" }`");

            sb.AppendLine("    * **`arc`**: `{ \"type\": \"arc\", \"id\": \"...\", \"x\": [number], \"y\": [number], \"innerRadius\": [number], \"outerRadius\": [number], \"angle\": [number], \"rotation\": [number], \"fill\": \"[color]\", \"name\": \"[string, אופציונלי]\" }`");

            sb.AppendLine("    * **`regularPolygon`**: `{ \"type\": \"regularPolygon\", \"id\": \"...\", \"x\": [number], \"y\": [number], \"sides\": [integer], \"radius\": [number], \"fill\": \"[color]\", \"name\": \"[string, אופציונלי]\" }`");

            sb.AppendLine("    * **`star`**: `{ \"type\": \"star\", \"id\": \"...\", \"x\": [number], \"y\": [number], \"numPoints\": [integer], \"innerRadius\": [number], \"outerRadius\": [number], \"fill\": \"[color]\", \"name\": \"[string, אופציונלי]\" }`");

            sb.AppendLine("    * **`text`**: `{ \"type\": \"text\", \"id\": \"...\", \"x\": [number], \"y\": [number], \"text\": \"[string]\", \"fontSize\": [number], \"fill\": \"[color]\", \"name\": \"[string, אופציונלי]\" }`");

            sb.AppendLine("    * **`delete`**: `{ \"type\": \"delete\", \"id\": \"[ה-id של הצורה למחיקה]\" }` - משמש למחיקת צורה קיימת בלבד.");

            sb.AppendLine();

            sb.AppendLine("7.  **הגיון עדכון:**");

            sb.AppendLine("    * **הוספה:** אם המשתמש מבקש להוסיף צורה חדשה, צור אובייקט JSON חדש עם `id` חדש.");

            sb.AppendLine("    * **שינוי/הזזה:** אם המשתמש מבקש לשנות או להזיז צורה קיימת (לדוגמה, \"העץ\", \"השמש\"), מצא את ה-`id` המתאים מתוך `מצב הציור הנוכחי`. החזר אובייקט JSON עבור אותה צורה עם ה-`id` המקורי שלה ועם הפרמטרים המעודכנים בלבד. **אל תשנה פרמטרים שלא צוינו בבקשה.**");

            sb.AppendLine("    * **מחיקה:** אם המשתמש מבקש להסיר צורה, החזר פקודת `\"type\": \"delete\"` עם ה-`id` של הצורה למחיקה.");

            sb.AppendLine("    * **שילוב:** ניתן להחזיר מספר פקודות (הוספה, שינוי, מחיקה) באותו מערך JSON.");

            sb.AppendLine();

            sb.AppendLine("---");

            sb.AppendLine();

            sb.AppendLine("**טיפול במיקום יחסי:**");

            sb.AppendLine("בעת קבלת הוראות למיקום יחסי (כגון 'מרכז', 'פינה', 'למעלה', 'למטה', 'שמאל', 'ימין', 'במרחק X מ...', 'מעל', 'מתחת', 'ליד'), עליך לחשב את קואורדינטות ה-X וה-Y המדויקות על בסיס **גודל הקנבס הנוכחי** והמיקום/גודל של צורות קיימות, במידת הצורך.");

            sb.AppendLine("הנה הנחיות ודוגמאות ספציפיות לכך:");

            sb.AppendLine("    * **מרכז הקנבס:** $x = CanvasWidth / 2$, $y = CanvasHeight / 2$. (זכור לקזז מחצית מרוחב/גובה הצורה כדי שהמרכז שלה יהיה במרכז הקנבס).");

            sb.AppendLine("    * **פינה שמאלית עליונה:** $x = [שוליים קטנים, לדוגמה 20]$, $y = [שוליים קטנים, לדוגמה 20]$.");

            sb.AppendLine("    * **פינה ימנית עליונה:** $x = CanvasWidth - [רוחב צורה] - [שוליים]$, $y = [שוליים קטנים]$.");

            sb.AppendLine("    * **פינה שמאלית תחתונה:** $x = [שוליים קטנים]$, $y = CanvasHeight - [גובה צורה] - [שוליים]$.");

            sb.AppendLine("    * **פינה ימנית תחתונה:** $x = CanvasWidth - [רוחב צורה] - [שוליים]$, $y = CanvasHeight - [גובה צורה] - [שוליים]$.");

            sb.AppendLine("    * **במרכז למעלה:** $x = CanvasWidth / 2$, $y = [שוליים קטנים]$.");

            sb.AppendLine("    * **במרכז למטה:** $x = CanvasWidth / 2$, $y = CanvasHeight - [גובה צורה] - [שוליים]$.");

            sb.AppendLine("    * **במרכז מצד שמאל:** $x = [שוליים קטנים]$, $y = CanvasHeight / 2$.");

            sb.AppendLine("    * **במרכז מצד ימין:** $x = CanvasWidth - [רוחב צורה] - [שוליים]$, $y = CanvasHeight / 2$.");

            sb.AppendLine("    * **מיקום יחסי לצורה קיימת:** אם המשתמש אומר 'מתחת לריבוע האדום', השתמש ב-X של הריבוע האדום וב-Y של הריבוע האדום + גובהו + מרווח קטן.");

            sb.AppendLine("    * **שימו לב למאפיינים הספציפיים של כל צורה** (לדוגמה: `radius` עבור עיגול, `width`/`height` עבור מלבן) בעת חישוב מיקומים מדויקים, כך שהצורה תמוקם כפי שהמשתמש מצפה (למשל, מרכז העיגול במרכז הקנבס, לא הפינה העליונה-שמאלית של התיבה החוסמת שלו).");

            sb.AppendLine("---");

            sb.AppendLine();

            sb.AppendLine("**דוגמאות מפורטות לפלט (תרגום של הוראות לדוגמה):**");

            sb.AppendLine();

            sb.AppendLine("#### דוגמה 1: הוספת שמש");

            sb.AppendLine("_הוראה: 'צייר שמש צהובה בפינה השמאלית העליונה'_");

            sb.AppendLine("```json");

            sb.AppendLine("[");

            sb.AppendLine("  { \"type\": \"circle\", \"id\": \"sun-123\", \"x\": 50, \"y\": 50, \"radius\": 50, \"fill\": \"yellow\", \"name\": \"שמש\" }"); // התאמה קלה ל-X,Y הגיוניים לפינה

            sb.AppendLine("]");

            sb.AppendLine("```");

            sb.AppendLine();

            sb.AppendLine("#### דוגמה 2: הזזת השמש למרכז הקנבס (בהנחה שקיימת שמש עם id \"sun-123\", רדיוס 50, וקנבס 600x400)");

            sb.AppendLine("_הוראה: 'הזז את השמש למרכז הקנבס'_");

            sb.AppendLine("```json");

            sb.AppendLine("[");

            sb.AppendLine("  { \"type\": \"circle\", \"id\": \"sun-123\", \"x\": 250, \"y\": 150, \"radius\": 50, \"fill\": \"yellow\", \"name\": \"שמש\" }"); // X: (600/2) - 50 = 250, Y: (400/2) - 50 = 150

            sb.AppendLine("]");

            sb.AppendLine("```");

            sb.AppendLine();

            sb.AppendLine("#### דוגמה 3: צייר ריבוע כחול גדול במרכז למטה (קנבס 600x400, רוחב 100, גובה 100)");

            sb.AppendLine("_הוראה: 'צייר ריבוע כחול גדול במרכז למטה'_");

            sb.AppendLine("```json");

            sb.AppendLine("[");

            sb.AppendLine("  { \"type\": \"rect\", \"id\": \"blue-square-1\", \"x\": 250, \"y\": 290, \"width\": 100, \"height\": 100, \"fill\": \"blue\", \"name\": \"ריבוע כחול\" }"); // X: (600/2) - (100/2) = 250, Y: 400 - 100 - 10 (שוליים) = 290

            sb.AppendLine("]");

            sb.AppendLine("```");

            sb.AppendLine();

            sb.AppendLine("#### דוגמה 4: הוסף ענן לבן גדול למעלה, ומחק את השמש (בהנחה שקיימת שמש עם id \"sun-123\", קנבס 600x400)");

            sb.AppendLine("_הוראה: 'הוסף ענן לבן גדול למעלה, ומחק את השמש'_");

            sb.AppendLine("```json");

            sb.AppendLine("[");

            sb.AppendLine("  { \"type\": \"rect\", \"id\": \"cloud-789\", \"x\": 225, \"y\": 30, \"width\": 150, \"height\": 70, \"fill\": \"white\", \"name\": \"ענן\" },"); // X: (600/2) - (150/2) = 225, Y: 30 (שוליים קטנים)

            sb.AppendLine("  { \"type\": \"delete\", \"id\": \"sun-123\" }");

            sb.AppendLine("]");

            sb.AppendLine("```");

            sb.AppendLine();

            sb.AppendLine("#### דוגמה 5: ציור תמונה ראשונית מורכבת (קנבס 600x400)");

            sb.AppendLine("_הוראה: 'צייר בית עם גג אדום, דלת כחולה וחלון, ושמש צהובה בשמיים. הוסף גם עץ ירוק עם גזע חום ליד הבית.'_");

            sb.AppendLine("```json");

            sb.AppendLine("[");

            sb.AppendLine("  { \"type\": \"rect\", \"id\": \"house-body-1\", \"x\": 200, \"y\": 200, \"width\": 150, \"height\": 100, \"fill\": \"gray\", \"name\": \"בית\" },");

            sb.AppendLine("  { \"type\": \"line\", \"id\": \"roof-left-1\", \"x1\": 180, \"y1\": 200, \"x2\": 275, \"y2\": 150, \"stroke\": \"red\", \"strokeWidth\": 5, \"name\": \"גג\" },");

            sb.AppendLine("  { \"type\": \"line\", \"id\": \"roof-right-1\", \"x1\": 370, \"y1\": 200, \"x2\": 275, \"y2\": 150, \"stroke\": \"red\", \"strokeWidth\": 5, \"name\": \"גג\" },");

            sb.AppendLine("  { \"type\": \"rect\", \"id\": \"door-1\", \"x\": 250, \"y\": 250, \"width\": 30, \"height\": 50, \"fill\": \"blue\", \"name\": \"דלת\" },");

            sb.AppendLine("  { \"type\": \"rect\", \"id\": \"window-1\", \"x\": 210, \"y\": 210, \"width\": 40, \"height\": 40, \"fill\": \"lightblue\", \"name\": \"חלון\" },");

            sb.AppendLine("  { \"type\": \"circle\", \"id\": \"sun-456\", \"x\": 500, \"y\": 70, \"radius\": 40, \"fill\": \"yellow\", \"name\": \"שמש\" },");

            sb.AppendLine("  { \"type\": \"rect\", \"id\": \"tree-trunk-1\", \"x\": 150, \"y\": 250, \"width\": 20, \"height\": 50, \"fill\": \"brown\", \"name\": \"גזע עץ\" },");

            sb.AppendLine("  { \"type\": \"circle\", \"id\": \"tree-foliage-1\", \"x\": 160, \"y\": 230, \"radius\": 40, \"fill\": \"green\", \"name\": \"צמרת עץ\" }");

            sb.AppendLine("]");

            sb.AppendLine("```");

            sb.AppendLine();

            sb.AppendLine("---");

            sb.AppendLine();

            sb.AppendLine("**המשימה שלך כעת:**");

            sb.AppendLine("תרגם את ההוראה הבאה ל-JSON של פקודות ציור, תוך התחשבות במצב הציור הקיים ובכל ההנחיות והדוגמאות לעיל:");

            sb.AppendLine($"הוראה: '{request.Prompt}'");



            var fullPrompt = sb.ToString();


            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new { text = fullPrompt }
                        }
                    }
                }
            };

            var httpRequest = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri($"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={_apiKey}"),
                Content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json")
            };

            Console.WriteLine($"Sending request to Gemini API: {JsonSerializer.Serialize(requestBody, new JsonSerializerOptions { WriteIndented = true })}");

            var response = await _httpClient.SendAsync(httpRequest);
            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine("Error response from API:");
                Console.WriteLine(responseContent);
                throw new HttpRequestException($"Status code: {(int)response.StatusCode}, Content: {responseContent}");
            }

            return responseContent;
        }
    }
}