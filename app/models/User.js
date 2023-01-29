const mongoose = require('mongoose');
const { ActionForEmailCampaignsEnum } = require('sib-api-v3-sdk/src/model/RequestContactExportCustomContactFilter');

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const settingSchema = new mongoose.Schema({
    language: {
        type: String,
        default: "EN"
    }
})

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please fill a valid email address']
    },
    email_active: {
        type: Boolean, 
        default: false
    }, 
    email_verification_code: {
        type: String,
    },
    country: {
        type: String,
    },
    avatar: {
        type: String,
    },
    expire_at: {
        type: String,
    },
    setting: {
        type: settingSchema,
        default: {
            languages: "EN"
        }
    }
});

userSchema.methods.updateInactiveDate = function () {
    this.expire_at = Date.now() + 86400000;
};

module.exports = mongoose.model('User', userSchema);
