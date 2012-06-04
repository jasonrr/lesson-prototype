$(document).ready(function () {

    var source = $("#video-template").html();
    var template = Handlebars.compile(source);

    // $("#video-holder").html(template({src: ""}));

    // Models
    window.Exploration = Backbone.Model.extend({
        defaults: {
            name: "blah"
        }
    });

    // Views
    // window.ExplorationView = Backbone.View.extend({

    //     template: Handlebars.templates['exploration'],

    //     render: function (eventName) {
    //         $(this.el).html(this.template({ name: "belk" }));
    //         return this;
    //     }
    // });

    var exploration = new Exploration({ name: "johN" });

    // var explorationView = new ExplorationView({ el: $("#exploration-holder"), model: exploration });
    // var el = explorationView.render().el;

    $(".extra").click(function () {
        $(document).scroll();
    });

    $(".sidebar").sticky({ topSpacing: 60, wrapperClassName: "sticky-wrapper" });

    $(".extra").sticky({ topSpacing: 60, wrapperClassName: "sticky-wrapper "});

});