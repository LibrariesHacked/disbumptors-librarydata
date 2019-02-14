var twitterlibraries = {
    lists: [],
    hashtags: { all: [] },
    mentions: { all: [] },
    month_counts: { all: {} },
    loadLists: function (callback) {
        $.getJSON('/data/disruptorssmall.json', function (data) {

            $.each(data.members, function (y, member) {

                listname_arr = [];
                id_arr = member[0].toString().split('|');
                $.each(id_arr, function (y, id) {
                    $.each(data.lists, function (z, list) {
                        if (id == list.id) {
                            listname_arr.push(list.listname);
                            var joined = moment(member[9], 'YYYYMMDD hh:mm').format('YYYYMM');
                            if (!this.hashtags[id]) this.hashtags[id] = [];
                            if (!this.mentions[id]) this.mentions[id] = [];
                            if (!this.month_counts[id]) this.month_counts[id] = {};
                            if (!this.month_counts[id][joined]) this.month_counts[id][joined] = 0;
                            if (!this.month_counts['all'][joined]) this.month_counts['all'][joined] = 0;
                            this.month_counts['all'][joined] = this.month_counts['all'][joined] + 1;
                            this.month_counts[id][joined] = this.month_counts[id][joined] + 1;
                            this.hashtags['all'] = this.hashtags['all'].concat(twttr.txt.extractHashtags(member[13]));
                            this.hashtags[id] = this.hashtags[id].concat(twttr.txt.extractHashtags(member[13]));
                            this.mentions['all'] = this.mentions['all'].concat(twttr.txt.extractMentions(member[13]));
                            this.mentions[id] = this.mentions[id].concat(twttr.txt.extractMentions(member[13]));
                        }
                    }.bind(this));

                }.bind(this));

                this.lists.push(
                    [
                        member[0],
                        member[1],
                        member[3],
                        member[7] || 0,
                        member[6] || 0,
                        member[11] || 0,
                        member[10] || 0,
                        member[9],
                        member[4],
                        member[12],
                        member[13]
                    ]
                );

            }.bind(this));
            callback();
        }.bind(this))
    }
};