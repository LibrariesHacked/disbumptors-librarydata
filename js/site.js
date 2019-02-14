$(function () {

    //Chart.defaults.global.defaultFontFamily = '"Neucha",-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';

    var library_types = {
        '1': {
            'name': 'Disbumptors'
        }
    };

    var background_colours = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
    ];

    var border_colours = [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
    ];

    twitterlibraries.loadLists(function () {
        // Set up hashtags bar chart
        var ctx_bar_hashtags = document.getElementById('cht_hashtags').getContext('2d');
        var bar_hashtags = new Chart(ctx_bar_hashtags, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        background_colours[0],
                        background_colours[1],
                        background_colours[2],
                        background_colours[3],
                        background_colours[4]
                    ],
                    borderColor: [
                        border_colours[0],
                        border_colours[1],
                        border_colours[2],
                        border_colours[3],
                        border_colours[4]
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'What do they talk about?'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Number of tweets'
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            callback: function (value) {
                                if (value.length > 12) {
                                    return value.substr(0, 12) + '...';
                                } else {
                                    return value
                                }

                            }
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Hashtag'
                        }
                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: true,
                    mode: 'label',
                    callbacks: {
                        title: function (tooltipItems, data) {
                            var idx = tooltipItems[0].index;
                            return data.labels[idx];
                        },
                        label: function (tooltipItems, data) {
                            var idx = tooltipItems.index;
                            return data.datasets[0].data[idx];
                        }
                    }
                },
                onClick: function (e, activeElements) {
                    window.open('https://twitter.com/hashtag/' + bar_hashtags.data.labels[activeElements[0]._index], '_blank');
                }
            }
        });

        // Set up mentions bar chart
        var ctx_bar_mentions = document.getElementById('cht_mentions').getContext('2d');
        var bar_mentions = new Chart(ctx_bar_mentions, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        background_colours[0],
                        background_colours[1],
                        background_colours[2],
                        background_colours[3],
                        background_colours[4]
                    ],
                    borderColor: [
                        border_colours[0],
                        border_colours[1],
                        border_colours[2],
                        border_colours[3],
                        border_colours[4]
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Who do they talk about?'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Number of tweets'
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            callback: function (value) {
                                if (value.length > 9) {
                                    return value.substr(0, 9) + '...';
                                } else {
                                    return value
                                }

                            }
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Account name'
                        }

                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: true,
                    mode: 'label',
                    callbacks: {
                        title: function (tooltipItems, data) {
                            var idx = tooltipItems[0].index;
                            return data.labels[idx];
                        },
                        label: function (tooltipItems, data) {
                            var idx = tooltipItems.index;
                            return data.datasets[0].data[idx];
                        }
                    }
                },
                onClick: function (e, activeElements) {
                    window.open('https://twitter.com/' + bar_mentions.data.labels[activeElements[0]._index], '_blank');
                }
            }
        });

        // Set up monthly line chart
        var ctx_line_joined = document.getElementById('cht_joined').getContext('2d');
        var line_joined = new Chart(ctx_line_joined, {
            type: 'line',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Count'
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Disrompters joining twitter'
                },
                legend: {
                    display: false
                }
            }
        });

        var setHashtags = function (list) {
            var hashtags = {};
            for (var i = 0; i < twitterlibraries.hashtags[list].length; i++) {
                if (!hashtags[twitterlibraries.hashtags[list][i]]) hashtags[twitterlibraries.hashtags[list][i]] = 0;
                hashtags[twitterlibraries.hashtags[list][i]] = hashtags[twitterlibraries.hashtags[list][i]] + 1;
            }
            var top_five = Object.keys(hashtags).sort(function (a, b) { return (hashtags[b] - hashtags[a]) }).slice(0, 5);
            bar_hashtags.data.labels = [];
            bar_hashtags.data.datasets[0].data = [];
            $.each(top_five, function (i, hashtag) {
                bar_hashtags.data.labels.push(hashtag);
                bar_hashtags.data.datasets[0].data.push(hashtags[hashtag]);
            });
            bar_hashtags.update();
        };

        var setMentions = function (list) {
            var mentions = {};
            for (var y = 0; y < twitterlibraries.mentions[list].length; y++) {
                if (!mentions[twitterlibraries.mentions[list][y]]) mentions[twitterlibraries.mentions[list][y]] = 0;
                mentions[twitterlibraries.mentions[list][y]] = mentions[twitterlibraries.mentions[list][y]] + 1;
            }
            var top_five = Object.keys(mentions).sort(function (a, b) { return (mentions[b] - mentions[a]) }).slice(0, 5);
            bar_mentions.data.labels = [];
            bar_mentions.data.datasets[0].data = [];
            $.each(top_five, function (i, mention) {
                bar_mentions.data.labels.push(mention);
                bar_mentions.data.datasets[0].data.push(mentions[mention]);
            });
            bar_mentions.update();
        };

        var setJoined = function (id) {
            line_joined.data.datasets = [];

            line_joined.data.labels = $.map(Object.keys(twitterlibraries.month_counts[id]), function (d, i) {
                return moment(d, 'YYYYMM').format('MMM YY')
            });
            line_joined.data.datasets.push({
                backgroundColor: [background_colours[1]],
                borderColor: [border_colours[1]],
                borderWidth: 1,
                label: '',
                data: Object.keys(twitterlibraries.month_counts[id]).map(function (mth, y) {
                    return twitterlibraries.month_counts[id][mth];
                }),
                pointRadius: 0
            });
            line_joined.update();
        };

        jQuery.fn.dataTableExt.oSort["customdate-desc"] = function (x, y) {
            return moment(x, 'Do MMMM YYYY').isAfter(moment(y, 'Do MMMM YYYY'));
        };
        jQuery.fn.dataTableExt.oSort["customdate-asc"] = function (x, y) {
            return moment(x, 'Do MMMM YYYY').isBefore(moment(y, 'Do MMMM YYYY'));
        }

        var libtable = $('#tbl-twitter')
            .on('init.dt', function () {
                $('#div_loading').hide();
            })
            .DataTable(
                {
                    processing: true,
                    responsive: true,
                    dom: 'Bfrtip',
                    info: false,
                    deferRender: true,
                    data: twitterlibraries.lists,
                    buttons: [
                    ],
                    columns: [
                        {
                            title: "Type",
                            render: function (data, type, row) {
                                return data;
                            },
                            visible: false,
                        },
                        { title: "Name" },
                        { title: "Location", visible: false },
                        { title: "Following" },
                        { title: "Followers" },
                        { title: "Tweets" },
                        { title: "Likes" },
                        {
                            title: "Joined",
                            sType: "customdate",
                            visible: false,
                            render: function (data, type, row) {
                                return moment(data, 'YYYYMMDD').format('Do MMMM YYYY');
                            }
                        },
                        {
                            title: "Description",
                            render: function (data, type, row) {
                                return twttr.txt.autoLink(twttr.txt.htmlEscape(data));
                            }
                        },
                        {
                            title: "Last tweeted",
                            sType: "customdate",
                            visible: false,
                            render: function (data, type, row) {
                                return moment(data, 'YYYYMMDD hh:mm').format('Do MMMM YYYY');
                            }
                        },
                        {
                            title: "Last tweet",
                            render: function (data, type, row) {
                                return twttr.txt.autoLink(twttr.txt.htmlEscape(data));
                            }
                        }
                    ]
                });

        var setList = function (id) {
            libtable.column(0).search((id == 'all' ? '' : id)).draw();
        }

        $.each(Object.keys(library_types), function (i, key) {
            if (i === 0) {
                setHashtags('1');
                setMentions('1');
                setJoined('1');
            }

        });
    });
});