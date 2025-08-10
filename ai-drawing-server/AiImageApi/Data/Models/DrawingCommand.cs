namespace AiImageApi.Data.Models
{
    public class DrawingCommand
    {
        public string? Id { get; set; } = string.Empty;
        public string? Type { get; set; }

        public double? X { get; set; }
        public double? Y { get; set; }
        public double? Radius { get; set; }

        public double? RadiusX { get; set; }
        public double? RadiusY { get; set; }

        public double? InnerRadius { get; set; }
        public double? OuterRadius { get; set; }
        public double? Angle { get; set; }
        public double? Rotation { get; set; }

        public int? Sides { get; set; }
        public int? NumPoints { get; set; }

        public string? Text { get; set; }
        public double? FontSize { get; set; }

        public double? Width { get; set; }
        public double? Height { get; set; }

        public double? X1 { get; set; }
        public double? Y1 { get; set; }
        public double? X2 { get; set; }
        public double? Y2 { get; set; }

        public string? Fill { get; set; }
        public string? Stroke { get; set; }
        public double? StrokeWidth { get; set; }
        public string? Name { get; set; }
    }
}
