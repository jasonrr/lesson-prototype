$(document).ready(function () {

    // data
    window.navdata = {
        navlinks: [
            {
                text: "Art History",
                link: "#"
            },
            {
                text: "Linear Perspective",
                link: "#"
            }
        ]
    };

    window.data = {

        modules:  [
            {
                title: "Introduction to linear perspective",
                nodes: [0,1,2,3]
            },
            {
                title: "The 1300s - before the \"discovery\" of linear perspective",
                nodes: [0,1,2]
            },
            {
                title: "The 1400s in Florence - linear perspective is \"discovered\"",
                nodes: [0,1,2]
            },
            {
                title: "Linear perspective in painting and sculpture in Florence and beyond",
                nodes: [0,1,2]
            }
        ]

    };

    window.nodeList = [

        {
            title: "Recognizing the elements of linear perspective",
            nodeType: "quiz",
            problems: [
                {
                    prompt: "Suppose you are working on stock market prediction, Typically tens of millions of shares of Microsoft stock are traded (i.e., bought/sold) each day. You would like to predict the number of Microsoft shares that will be traded tomorrow. Would you treat this as a classification or a regression problem?",
                    options: [
                        {
                            content: "Option 1"
                        },
                        {
                            content: "Option 2"
                        },
                        {
                            content: "Option 3"
                        }
                    ]
                },
                {
                    prompt: "Suppose you are working on stock market prediction, Typically tens of millions of shares of Microsoft stock are traded (i.e., bought/sold) each day. You would like to predict the number of Microsoft shares that will be traded tomorrow. Would you treat this as a classification or a regression problem?",
                    options: [
                        {
                            content: "Option 1"
                        },
                        {
                            content: "Option 2"
                        },
                        {
                            content: "Option 3"
                        }
                    ]
                }
            ]
        },
        {

            title: "Lorenzetti, Presentation of Jesus in the Temple",
            nodeType: "video",
            youtubeID: "_lzdhIHLwcQ"

        },
        {

            title: "Visual vocabulary",
            nodeType: "exercise",
            prompt: "Are the points E, I, and A coplanar?",
            html: "<img src='/images/exercise.png'/>"
        },
        {

            title: "Some exploration",
            nodeType: "exploration",
            prompt: "Play around with this simulation!",
            html: "<div id='vis'><script src='js/apollonian-gasket.js'></script></div>"
        }
    ];

    window.iconMap = {
        video: "icon-facetime-video",
        exploration: "icon-plane",
        exercise: "icon-bar-chart",
        quiz: "icon-list-alt",
        glue: "icon-align-left",
        text: "icon-align-left"
    };

    // register helpers
    Handlebars.registerHelper("equal", function (lvalue, rvalue, options) {
        if (arguments.length < 3) {
            throw new Error("Handlebars Helper equal needs 2 parameters");
        }
        if ( lvalue != rvalue ) {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    });

    Handlebars.registerHelper('eachIndexed', function (context, options) {
        var fn = options.fn, inverse = options.inverse;
        var ret = "";

        if (context && context.length > 0) {
            for (var i=0, j=context.length; i<j; i++) {
                context[i]["index"] = i+1;
                ret = ret + fn(context[i]);
            }
        } else {
            ret = inverse(this);
        }
        return ret;
    });

    // register partials
    Handlebars.registerPartial("video-node", $("#video-node-partial").html());
    Handlebars.registerPartial("exploration-node", $("#exploration-node-partial").html());
    Handlebars.registerPartial("exercise-node", $("#exercise-node-partial").html());
    Handlebars.registerPartial("quiz-node", $("#quiz-node-partial").html());
    Handlebars.registerPartial("multiple-choice", $("#multiple-choice-partial").html());
    Handlebars.registerPartial("glue-node", $("#glue-node-partial").html());
    Handlebars.registerPartial("text-node", $("#text-node-partial").html());

    window.sidebarTemplate = Handlebars.compile($("#sidebar-template").html());
    window.mainTemplate = Handlebars.compile($("#main-template").html());
    window.navlinksTemplate = Handlebars.compile($("#navlinks-template").html());

    // preprocess data (add nodes and icons)
    _.each(data.modules, function (module, i) {
        module.nodes = _.map(module.nodes, function (nodeID, i) {
            var node = nodeList[nodeID];
            var type = node.nodeType;
            node.icon = iconMap[type];
            return node;
        });
    });

    // render
    $sidebar = $("#sidebar");
    $main = $("#main");
    $navlinks = $("#navbar .container-fluid");
    $extra = $("#extra");
    $panelHolder = $("#panel-holder");

    $sidebar.html(sidebarTemplate(data));
    $main.html(mainTemplate(data));
    $navlinks.html(navlinksTemplate(navdata));

    var speed = 200;

    $extra.click(function () {
        $panelHolder.animate({
            left: "-350px"
        }, speed);
    });

    $sidebar.click(function () {
        $panelHolder.animate({
            left: "0px"
        }, speed);
    });


    _.each(data.modules, function (module, i) {
        var headingElem = "#module" + i + "heading";
        var bodyElem = "#module" + i + "body";
        console.log(bodyElem);
        $(headingElem).click(function () {
            $(bodyElem).collapse("toggle");
        });
    });

    $("#module1heading").click(function () {
        $("#module1body").collapse("toggle");
    });

});
