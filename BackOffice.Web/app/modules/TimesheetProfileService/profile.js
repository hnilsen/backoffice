$(function() {
    /*
     var profiles = [{
     "Countries" : [],
     "Currency" : "USD",
     "WebTimesheetProfileId" : "c870875d-88a4-44c3-a0e3-6adfe939c4c9",
     "WebTimesheetProfileName" : "All others"
     }, {
     "Countries" : [{
     "CountryId" : "0ae94767-a0a3-415e-bba7-ce18ac384de0",
     "CountryName" : "Singapore"
     }],
     "Currency" : "USD",
     "WebTimesheetProfileId" : "9ca4c780-3efc-4125-9745-82ecf9abeaa1",
     "WebTimesheetProfileName" : "Asia"
     }, {
     "Countries" : [{
     "CountryId" : "71a6ee1f-6d32-4def-99a1-9a2dd9739c0d",
     "CountryName" : "Finland"
     }],
     "Currency" : "EUR",
     "WebTimesheetProfileId" : "3e3432e5-e741-4739-9c59-7337c4958d7f",
     "WebTimesheetProfileName" : "Finland"
     }, {
     "Countries" : [{
     "CountryId" : "d31da4b1-82fa-4ef2-ba7e-21a2a4224e3d",
     "CountryName" : "Denmark"
     }, {
     "CountryId" : "fff94ac3-d643-43c6-b3d6-b7f4b16f6311",
     "CountryName" : "Norway"
     }, {
     "CountryId" : "398990fd-4323-4f52-b7d2-cda132bf48b9",
     "CountryName" : "Sweden"
     }],
     "Currency" : "NOK",
     "WebTimesheetProfileId" : "c3bc639c-519f-47a4-8d40-6601ea29bf17",
     "WebTimesheetProfileName" : "Scandinavia"
     }, {
     "Countries" : [{
     "CountryId" : "3addd53c-c400-4036-947e-12591b20d74c",
     "CountryName" : "United Kingdom"
     }],
     "Currency" : "GBP",
     "WebTimesheetProfileId" : "26947773-23a6-43a5-83a0-8892d2276fa9",
     "WebTimesheetProfileName" : "UK"
     }];
     */
    console.log("Lastet DOM");
    var counter = makeCounter();
    var Profile = Backbone.Model.extend({
        defaults : function() {
            return {
                WebTimesheetProfileName : "",
                currency : "USD",
                Countries : [{
                    "CountryId" : "3addd53c-c400-4036-947e-12591b20d74c",
                    "CountryName" : "United Kingdom"
                }]

            };
        },
        initialize : function() {
            counter.increment();

            this.on('change', function() {
                console.log('endret verdier for modellen');
            });
        }
    });

    var ProfilesList = Backbone.Collection.extend({
        model : Profile,
        // url : 'http://139.117.56.95/BackOfficeService/WebTimesheetProfileService.svc/WebTimesheetProfiles',
        url : '/profiles',
        initialize : function() {
            console.log("collection initialisert");

        },
        parse : function(response) {

            return response.Data;
        }
    });

    var ProfileView = Backbone.View.extend({
        tagName : 'div',
        template : $('#profile-template').html(),
        render : function() {

            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        }
    });

    var TimesheetProfilesView = Backbone.View.extend({
        el : $('#profile'),
        initialize : function() {
            console.log("initialiserer...");
            // @TODO: Henter lokalt
            window.profiles = new ProfilesList();

            var that = this;
            /* Dette funker faktisk, men vil gjøre det på den "ordentlige" måten
             $.ajax({
             //url : 'http://139.117.56.95/BackOfficeService/WebTimesheetProfileService.svc/WebTimesheetProfiles',

             dataType : "json",
             error : function(errorThrown) {
             console.log(errorThrown);
             },
             success : function(response) {
             for(var i = 0; i < response.Data.length; i++) {
             item = response.Data[i];
             profiles.add(item);
             console.log(profiles.models.length);
             }

             }
             });
             */
                 profiles.on("add", this.renderProfile, this);
            profiles.bind('reset', this.render, this);
            profiles.bind('all', this.render, this);
console.log("før fetch");
           profiles.fetch();
           /*
            profiles.fetch({
                success : function(resp) {
                    console.log("suksess" + profiles.toJSON());
                },
                error : function(resp) {
                    console.log("Error" + resp);
                }
            });
*/
            //this.render();
       
        },
        events : {
            "click #add" : "addProfile"

        },
        render : function() {
            console.log("Begynner å rendre TimesheetProfilesView");
            var that = this;
            console.log("Antall modeller: " + profiles.models.length);
            _.each(profiles.models, function(item) {

                that.renderProfile(item);
            }, this);
        },

        renderProfile : function(item) {
            var profileView = new ProfileView({
                model : item
            });
            $(this.el).append(profileView.render().el);
        },
        addProfile : function(event) {
            console.log("Prøver å legge til en ny profil");
            event.preventDefault();
            var newModel = {};
            $("#addProfile").children("input").each(function(i, el) {
                if($(el).val() !== "") {
                    console.log("Lagt til " + $(el).val());
                    newModel[el.id] = $(el).val();
                }
            });

            //@TODO: Lagre til server!!
            //profiles.push(newModel);
            profiles.add(new Profile(newModel));
            console.log("Laget ny profil. Nå har vi " + counter.value() + " modeller");
        }
    });
    Backbone.sync = function(method, model) {
        console.log("I've been passed " + method + " with " + JSON.stringify(model));
    };
    var timesheetProfileView = new TimesheetProfilesView();

});
/*
 var profile = (function() {
 return {
 getProfile : function() {
 var template = _.template($('#profile-template').html());
 console.log("DOM lastet");
 $.ajax({
 url : 'http://139.117.56.95/BackOfficeService/WebTimesheetProfileService.svc/WebTimesheetProfiles',
 dataType : "json",
 error : function(errorThrown) {
 console.log(errorThrown);
 },
 success : function(response) {
 console.log(response + " " + response.Data.length);
 for(var i = 0; i < response.Data.length; i++) {
 item = response.Data[i];
 $("#profile ").append(template({
 WebTimesheetProfileName : item.WebTimesheetProfileName,
 Countries : item.Countries,
 Currency : item.Currency
 }));
 }
 }
 });
 },
 init : function() {
 profile.getProfile();
 },
 updateProfile : function(profile) {

 }
 }
 })(); */
var makeCounter = function() {
    var privateCounter = 0;
    function changeBy(val) {
        privateCounter += val;
    }

    return {
        increment : function() {
            changeBy(1);
        },
        decrement : function() {
            changeBy(-1);
        },
        value : function() {
            return privateCounter;
        }
    }
};