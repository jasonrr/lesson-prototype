$(document).ready(function () {

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

    // compile templates
    window.sidebarTemplate = Handlebars.compile($("#sidebar-template").html());
    window.mainTemplate = Handlebars.compile($("#main-template").html());
    window.navlinksTemplate = Handlebars.compile($("#navlinks-template").html()); // not used currently

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "../data/sample-lesson.json",
        success: addElems
    });

    function addElems (data) {

        // preprocess data (add nodes and icons)
        _.each(data.modules, function (module, i) {
            module.nodes = _.map(module.nodes, function (nodeID, i) {
                var node = data.nodeList[nodeID];
                var type = node.nodeType;
                node.icon = iconMap[type];
                return node;
            });
        });

        // render
        $sidebar = $("#sidebar");
        $main = $("#main");
        $extra = $("#extra");
        $panelHolder = $("#panel-holder");

        $sidebar.html(sidebarTemplate(data));
        $main.html(mainTemplate(data));

        // animation stuff
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

        $("#module1heading").click(function () {
            $("#module1body").collapse("toggle");
        });

    }

});
