export default class Persona {
    constructor(id, goalId, avatar) {
        this.id = id;
        this.goalId = goalId;
        this.avatar = avatar;
        this.info = {};
        this.sources = {};
        this.purchase = {};
        this.coreProblems = { solutions: ["", "", ""], painPoints: ["", "", ""] };
        this.salesCanvas = {
            trigger: "",
            action: "",
            conversation: "",
            sell: ""
        }
    }

    withGeneralInfo(firstName, lastName, age, gender) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        return this;
    }

    withOtherInfo(maritalStatus, children, location, quote, jobTitle, income, education, other) {
        this.info.maritalStatus = maritalStatus;
        this.info.children = children;
        this.info.location = location;
        this.info.quote = quote;
        this.info.jobTitle = jobTitle;
        this.info.income = income;
        this.info.education = education;
        this.info.other = other;
        return this;
    }

    withInformationSources(books, magazines, blogs, gurus, otherSources) {
        this.sources.books = books;
        this.sources.magazines = magazines;
        this.sources.blogs = blogs;
        this.sources.gurus = gurus;
        this.sources.other = otherSources;
        return this;
    }

    withPurchaseProcess(salesObjections, purchaseRole) {
        this.purchase.objections = salesObjections;
        this.purchase.role = purchaseRole;
        return this;
    }

    withSalesCanvas(salesCanvas) {
        if (salesCanvas) {
            this.salesCanvas.id = salesCanvas.id;
            this.salesCanvas.trigger = salesCanvas.trigger;
            this.salesCanvas.action = salesCanvas.action;
            this.salesCanvas.conversation = salesCanvas.conversation;
            this.salesCanvas.sell = salesCanvas.sell;
        }
        return this;
    }

    withCoreProblem(coreProblem) {
        if (coreProblem) {
            this.coreProblems.id = coreProblem.id;
            this.coreProblems.goals = coreProblem.goals;
            this.coreProblems.values = coreProblem.values;
            this.coreProblems.challenges = coreProblem.challenges;
            this.coreProblems.painPoints = coreProblem.painPoints || ["", "", ""];
            this.coreProblems.solutions = coreProblem.solutions || ["", "", ""];
        }
        return this;
    }
}