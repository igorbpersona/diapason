function MusicSheetManager(challangeId)
{
    this.challange = challangeId;
    this.name = null;
    this.type = null;
    this.sheet = null;


    this.loadChallange = function()
    {
        let text = "{" +
            "  \"name\": \"Mariana\"," +
            "  \"type\": \"scale\"," +
            "  \"sheet\": [" +
            "    [3000, 5000, \"C\"]," +
            "    [7000, 9000, \"D\"]," +
            "    [11000, 13000, \"E\"]," +
            "    [15000, 17000, \"F\"]," +
            "    [19000, 21000, \"G\"]," +
            "    [23000, 25000, \"G_SUS\"]," +
            "    [27000, 29000, \"A\"]," +
            "    [31000, 33000, \"B\"]," +
            "    [35000, 37000, \"A\"]," +
            "    [39000, 41000, \"G_SUS\"]," +
            "    [43000, 45000, \"G\"]," +
            "    [47000, 49000, \"F\"]," +
            "    [51000, 53000, \"E\"]," +
            "    [55000, 57000, \"D\"]," +
            "    [59000, 61000, \"C\"]" +
            "  ]" +
            "}";

        let jsonSheet = JSON.parse(text);
        this.name = jsonSheet.name;
        this.type = jsonSheet.type;
        this.sheet = jsonSheet.sheet;
    };

}
