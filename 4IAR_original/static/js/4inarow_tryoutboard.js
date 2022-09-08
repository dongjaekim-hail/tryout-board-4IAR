var b, bp, wp, bp_tryout, wp_tryout, user_color, m
var tiles = [];
var game_status = "ready"
//game_status = "ready";
//move_index = 0;
//last_move = 99;
var M = 9, N = 4
var win_color = "#22ddaa",
    square_color = "#999999",
    highlight_color = "#bbbbbb";
var data_log = []
var data_log_tryout = []
var level = 50
var category = 2
var lastresult = "win"
var dismissed_click_prompt = false;
var dismissed_tryout_click_prompt = false;


function create_board() {
    bp = new Array(M * N).fill(0)
    wp = new Array(M * N).fill(0)
    $(".canvas").empty();
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < M; j++) {
            $(".canvas").append($("<div>", { "class": "tile", "id": "tile_" + (i * M + j).toString() }))
        }
        $(".canvas").append("<br>");
    }
}

function create_tryout_board() {
    bp_tryout = new Array(M * N).fill(0)
    wp_tryout = new Array(M * N).fill(0)
    $(".tryout-canvas").empty();
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < M; j++) {
            $(".tryout-canvas").append($("<div>", { "class": "tileTryout", "id": "tryout_tile_" + (i * M + j).toString() }))
        }
        $(".tryout-canvas").append("<br>");
    }
}

function add_piece(i, color) {
    if (color == 0) {//BLACK
        $("#tile_" + i.toString()).append(
            $("<div>", { "class": "blackPiece" })
        ).removeClass("tile").addClass("usedTile").off('mouseenter').off('mouseleave').css("backgroundColor", square_color);
        bp[i] = 1;
    } else {
        $("#tile_" + i.toString()).append(
            $("<div>", { "class": "whitePiece" })
        ).removeClass("tile").addClass("usedTile").off('mouseenter').off('mouseleave').css("backgroundColor", square_color);
        wp[i] = 1;
    }
}

function remove_piece(i) {
    $("#tile_" + i.toString()).empty().removeClass("usedTile").addClass("tile").off().css("backgroundColor", square_color);
    bp[i] = 0
    wp[i] = 0
}


function show_last_move(i, color) {
    if (color == 0) {//BLACK
        $(".blackShadow").remove();
        $("#tile_" + i.toString()).append($("<div>", { "class": "blackShadow" }))
    } else {
        $(".whiteShadow").remove();
        $("#tile_" + i.toString()).append($("<div>", { "class": "whiteShadow" }))
    }
}

function check_win(color) {
    fourinarows = [[0, 9, 18, 27],
    [1, 10, 19, 28],
    [2, 11, 20, 29],
    [3, 12, 21, 30],
    [4, 13, 22, 31],
    [5, 14, 23, 32],
    [6, 15, 24, 33],
    [7, 16, 25, 34],
    [8, 17, 26, 35],
    [0, 10, 20, 30],
    [1, 11, 21, 31],
    [2, 12, 22, 32],
    [3, 13, 23, 33],
    [4, 14, 24, 34],
    [5, 15, 25, 35],
    [3, 11, 19, 27],
    [4, 12, 20, 28],
    [5, 13, 21, 29],
    [6, 14, 22, 30],
    [7, 15, 23, 31],
    [8, 16, 24, 32],
    [0, 1, 2, 3],
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
    [4, 5, 6, 7],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [10, 11, 12, 13],
    [11, 12, 13, 14],
    [12, 13, 14, 15],
    [13, 14, 15, 16],
    [14, 15, 16, 17],
    [18, 19, 20, 21],
    [19, 20, 21, 22],
    [20, 21, 22, 23],
    [21, 22, 23, 24],
    [22, 23, 24, 25],
    [23, 24, 25, 26],
    [27, 28, 29, 30],
    [28, 29, 30, 31],
    [29, 30, 31, 32],
    [30, 31, 32, 33],
    [31, 32, 33, 34],
    [32, 33, 34, 35]]

    for (var i = 0; i < fourinarows.length; i++) {
        var n = 0;
        for (var j = 0; j < N; j++) {
            if (color == 0)//BLACK
                n += bp[fourinarows[i][j]]
            else
                n += wp[fourinarows[i][j]]
        }
        if (n == N)
            return fourinarows[i]
    }
    return []
}

function check_draw() {
    for (var i = 0; i < M * N; i++)
        if (bp[i] == 0 && wp[i] == 0)
            return false;
    return true;
}

function show_win(color, pieces) {
    for (i = 0; i < pieces.length; i++) {
        if (color == 0)
            $("#tile_" + pieces[i] + " .blackPiece").animate({ "backgroundColor": win_color }, 250)
        else
            $("#tile_" + pieces[i] + " .whitePiece").animate({ "backgroundColor": win_color }, 250)
    }
}




function add_piece_tryout(i, color) {
    if (color == 0) {//BLACK
        $("#tryout_tile_" + i.toString()).append(
            $("<div>", { "class": "blackPiece" })
        ).removeClass("tileTryout").addClass("usedTileTryout").off('mouseenter').off('mouseleave').css("backgroundColor", square_color);
        bp_tryout[i] = 1;
    } else {
        $("#tryout_tile_" + i.toString()).append(
            $("<div>", { "class": "whitePiece" })
        ).removeClass("tileTryout").addClass("usedTileTryout").off('mouseenter').off('mouseleave').css("backgroundColor", square_color);
        wp_tryout[i] = 1;
    }
}

function remove_piece_tryout(i) {
    $("#tryout_tile_" + i.toString()).empty().removeClass("usedTile").addClass("tile").off().css("backgroundColor", square_color);
    bp_tryout[i] = 0
    wp_tryout[i] = 0
}


function show_last_move_tryout(i, color) {
    if (color == 0) {//BLACK
        $(".blackShadow").remove();
        $("#tryout_tile_" + i.toString()).append($("<div>", { "class": "blackShadow" }))
    } else {
        $(".whiteShadow").remove();
        $("#tryout_tile_" + i.toString()).append($("<div>", { "class": "whiteShadow" }))
    }
}


function show_win_tryout(color, pieces) {
    for (i = 0; i < pieces.length; i++) {
        if (color == 0)
            $("#tryout_tile_" + pieces[i] + " .blackPiece").animate({ "backgroundColor": win_color }, 250)
        else
            $("#tryout_tile_" + pieces[i] + " .whitePiece").animate({ "backgroundColor": win_color }, 250)
    }
}
function check_tryout_win(color) {
    fourinarows = [[0, 9, 18, 27],
    [1, 10, 19, 28],
    [2, 11, 20, 29],
    [3, 12, 21, 30],
    [4, 13, 22, 31],
    [5, 14, 23, 32],
    [6, 15, 24, 33],
    [7, 16, 25, 34],
    [8, 17, 26, 35],
    [0, 10, 20, 30],
    [1, 11, 21, 31],
    [2, 12, 22, 32],
    [3, 13, 23, 33],
    [4, 14, 24, 34],
    [5, 15, 25, 35],
    [3, 11, 19, 27],
    [4, 12, 20, 28],
    [5, 13, 21, 29],
    [6, 14, 22, 30],
    [7, 15, 23, 31],
    [8, 16, 24, 32],
    [0, 1, 2, 3],
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
    [4, 5, 6, 7],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [10, 11, 12, 13],
    [11, 12, 13, 14],
    [12, 13, 14, 15],
    [13, 14, 15, 16],
    [14, 15, 16, 17],
    [18, 19, 20, 21],
    [19, 20, 21, 22],
    [20, 21, 22, 23],
    [21, 22, 23, 24],
    [22, 23, 24, 25],
    [23, 24, 25, 26],
    [27, 28, 29, 30],
    [28, 29, 30, 31],
    [29, 30, 31, 32],
    [30, 31, 32, 33],
    [31, 32, 33, 34],
    [32, 33, 34, 35]]

    for (var i = 0; i < fourinarows.length; i++) {
        var n = 0;
        for (var j = 0; j < N; j++) {
            if (color == 0)//BLACK
                n += bp_tryout[fourinarows[i][j]]
            else
                n += wp_tryout[fourinarows[i][j]]
        }
        if (n == N)
            return fourinarows[i]
    }
    return []
}

function check_tryout_draw() {
    for (var i = 0; i < M * N; i++)
        if (bp_tryout[i] == 0 && wp_tryout[i] == 0)
            return false;
    return true;
}


function user_move(game_info) {
    log_data({ "event_type": "your turn", "event_info": { "bp": bp.join(""), "wp": wp.join("") } })
    $('.headertext h1').text('Your turn. You play ' + (user_color == 0 ? 'black' : 'white') + ".");
    $('.canvas, .tile').css('cursor', 'pointer');
    $('.usedTile, .usedTile div').css('cursor', 'default');
    $('.tile').off().on('mouseenter', function (e) {
        $(e.target).animate({ "background-color": highlight_color }, 50)
    }).on('mouseleave', function (e) {
        $(e.target).animate({ "background-color": square_color }, 50)
    });
    $('.tile').off('click').on('click', function (e) {
        $('.tile').off('mouseenter').off('mouseleave').off('click');
        $('.canvas, .canvas div').css('cursor', 'default');
        tile_ind = parseInt(e.target.id.replace("tile_", ""));
        log_data({ "event_type": "user move", "event_info": { "tile": tile_ind, "user_color": (user_color == 0 ? 'black' : 'white'), "bp": bp.join(""), "wp": wp.join("") } })
        add_piece(tile_ind, user_color);
        show_last_move(tile_ind, user_color);
        $(".clickprompt").hide();
        dismissed_click_prompt = true;
        winning_pieces = check_win(user_color)
        if (winning_pieces.length == N) {
            show_win(user_color, winning_pieces)
            log_data({ "event_type": "user win", "event_info": { "bp": bp.join(""), "wp": wp.join(""), "winning_pieces": winning_pieces } })
            $('.headertext h1').text('Game over, you win').css('color', '#000000');
            end_game(game_info, 'win')
        }
        else if (check_draw()) {
            log_data({ "event_type": "draw", "event_info": { "bp": bp.join(""), "wp": wp.join("") } })
            $('.headertext h1').text('Game over, draw').css('color', '#000000');
            end_game(game_info, 'draw')
        }
        else {
            make_opponent_move(game_info)
        }
    });

    // Dongjae tryoutboard
    $("#tryout").show().css({ "display": "inline" }).off("click").on("click", function () {
        log_data_tryout({ "event_type": "open tryout", "event_info": { "game_num": game_info.num, "is_practice": game_info.practice, "level": level } })
        $("#myModal").css("display", "block");
        $("#popup_close").off("click").on("click", function () { $("#myModal").css("display", "none") })
        $('.popuptext h2').text('Your turn. You play ' + (user_color == 0 ? 'black' : 'white') + ".");
        start_tryout_game(instructions[current_instruction_nr].tryoutgame_info, instructions[current_instruction_nr].game_info)
    });
}

function user_tryout_move(game_info) {
    log_data_tryout({ "event_type": "your turn", "event_info": { "bp": bp_tryout.join(""), "wp": wp_tryout.join("") } })


    $('#close-button').off("click").on('click', function (e) {
        log_data_tryout({ "event_type": "close tryout", "event_info": { "game_num": game_info.num, "is_practice": game_info.practice, "level": level } })
        $("#myModal").css("display", "none")
    });



    $('.popuptext h2').text('Your turn. You play ' + (user_color == 0 ? 'black' : 'white') + ".");
    $('.tryout-canvas, .tile').css('cursor', 'pointer');
    $('.usedTileTryout, .usedTileTryout div').css('cursor', 'default');
    $('.tileTryout').off().on('mouseenter', function (e) {
        $(e.target).animate({ "background-color": highlight_color }, 50)
    }).on('mouseleave', function (e) {
        $(e.target).animate({ "background-color": square_color }, 50)
    });
    winning_pieces_already = check_tryout_win(user_color)
    winning_pieces_mainboard = check_win(user_color)
    draw_pieces_mainboard = check_draw(user_color)
    if (!(winning_pieces_already.length == N) || (winning_pieces_mainboard || draw_pieces_mainboard)) {
        $('.tileTryout').off('click').on('click', function (e) {
            $('.tileTryout').off('mouseenter').off('mouseleave').off('click');
            $('.tryout-canvas, .tryout-canvas div').css('cursor', 'default');
            tile_ind = parseInt(e.target.id.replace("tryout_tile_", ""));
            log_data_tryout({ "event_type": "user move", "event_info": { "tile": tile_ind, "user_color": (user_color == 0 ? 'black' : 'white'), "bp": bp_tryout.join(""), "wp": wp_tryout.join("") } })
            add_piece_tryout(tile_ind, user_color);
            show_last_move_tryout(tile_ind, user_color);
            $(".tryout_clickprompt").hide();
            dismissed_tryout_click_prompt = true;
            winning_pieces = check_tryout_win(user_color)
            if (winning_pieces.length == N) {
                show_win_tryout(user_color, winning_pieces)
                log_data_tryout({ "event_type": "user win", "event_info": { "bp": bp_tryout.join(""), "wp": wp_tryout.join(""), "winning_pieces": winning_pieces } })
                $('.popuptext h2').text('Game over, you win').css('color', '#000000');
                end_tryout_game(game_info, 'win')
            }
            else if (check_draw()) {
                log_data_tryout({ "event_type": "draw", "event_info": { "bp": bp_tryout.join(""), "wp": wp_tryout.join("") } })
                $('.popuptext h2').text('Game over, draw').css('color', '#000000');
                end_tryout_game(game_info, 'draw')
            }
            else {
                make_user_opponent_tryout_move(game_info)
            }
        });
    }

}


function make_user_opponent_tryout_move(game_info) {
    log_data_tryout({ "event_type": "waiting for opponent", "event_info": { "bp": bp_tryout.join(""), "wp": wp_tryout.join("") } })


    $('#close-button').off("click").on('click', function (e) {
        log_data_tryout({ "event_type": "close tryout", "event_info": { "game_num": game_info.num, "is_practice": game_info.practice, "level": level } })
        $("#myModal").css("display", "none")
    });


    $('.popuptext h2').text('Opponent\'s turn. Now you play ' + (user_color == 0 ? 'black' : 'white') + ".");
    opponent_color = (user_color + 1) % 2
    $('.tryout-canvas, .tileTryout').css('cursor', 'pointer');
    $('.usedTileTryout, .usedTileTryout div').css('cursor', 'default');
    $('.tileTryout').off().on('mouseenter', function (e) {
        $(e.target).animate({ "background-color": highlight_color }, 50)
    }).on('mouseleave', function (e) {
        $(e.target).animate({ "background-color": square_color }, 50)
    });
    winning_pieces_already = check_tryout_win(opponent_color)
    winning_pieces_mainboard = check_win(opponent_color)
    draw_pieces_mainboard = check_draw(opponent_color)
    if (!(winning_pieces_already.length == N) || (winning_pieces_mainboard || draw_pieces_mainboard)) {
        $('.tileTryout').off('click').on('click', function (e) {
            $('.tileTryout').off('mouseenter').off('mouseleave').off('click');
            $('.tryout-canvas, .tryout-canvas div').css('cursor', 'default');
            tile_ind = parseInt(e.target.id.replace("tryout_tile_", ""));
            log_data_tryout({ "event_type": "opponent move", "event_info": { "tile": tile_ind, "user_color": (opponent_color == 0 ? 'black' : 'white'), "bp": bp_tryout.join(""), "wp": wp_tryout.join("") } })
            add_piece_tryout(tile_ind, opponent_color);
            show_last_move_tryout(tile_ind, opponent_color);
            $(".tryout_clickprompt").hide();
            dismissed_tryout_click_prompt = true;
            winning_pieces = check_tryout_win(opponent_color)
            if (winning_pieces.length == N) {
                show_win_tryout(opponent_color, winning_pieces)
                log_data_tryout({ "event_type": "opponent win", "event_info": { "bp": bp_tryout.join(""), "wp": wp_tryout.join(""), "winning_pieces": winning_pieces } })
                $('.popuptext h2').text('Game over, opponent win').css('color', '#000000');
                end_tryout_game(game_info, 'win')
            }
            else if (check_draw()) {
                log_data_tryout({ "event_type": "draw", "event_info": { "bp": bp_tryout.join(""), "wp": wp_tryout.join("") } })
                $('.popuptext h2').text('Game over, draw').css('color', '#000000');
                end_tryout_game(game_info, 'draw')
            }
            else {
                // make_opponent_move(game_info)
                user_tryout_move(game_info)
            }
        });
    }
}



function make_opponent_move(game_info) {
    log_data({ "event_type": "waiting for opponent", "event_info": { "bp": bp.join(""), "wp": wp.join("") } })
    $('.headertext h1').text('Waiting for opponent').css('color', '#333333');
    setTimeout(function () {
        opponent_color = (user_color + 1) % 2
        seed = Date.now()
        tile_ind = makemove(seed, bp.join(""), wp.join(""), opponent_color, level);
        setTimeout(function () {
            log_data({ "event_type": "opponent move", "event_info": { "tile": tile_ind, "user_color": (user_color == 0 ? 'black' : 'white'), "bp": bp.join(""), "wp": wp.join(""), "level": level } })
            add_piece(tile_ind, opponent_color);
            show_last_move(tile_ind, opponent_color);
            winning_pieces = check_win(opponent_color)
            if (winning_pieces.length == N) {
                log_data({ "event_type": "opponent win", "event_info": { "bp": bp.join(""), "wp": wp.join(""), "winning_pieces": winning_pieces } })
                show_win(opponent_color, winning_pieces)
                $('.headertext h1').text('Game over, you lose').css('color', '#000000');
                end_game(game_info, 'opponent win')
            }
            else if (check_draw()) {
                log_data({ "event_type": "draw", "event_info": { "bp": bp.join(""), "wp": wp.join("") } })
                $('.headertext h1').text('Game over, draw').css('color', '#000000');
                end_game(game_info, 'draw')
            }
            else {
                user_move(game_info)
            }
        }, 1000);
    }, 0)
}

// Dongjae tryoutboard
function start_tryout_game(tryoutgame_info, game_info) {
    if (!tryoutgame_info.num) {
        tryoutgame_info.num = 0;
        if (tryoutgame_info.startCategory) category = tryoutgame_info.startCategory;
    }
    // $('#instructions').hide();
    // $('.overlayed').hide();
    $('.tryout_gamecount').text(`${game_info.practice ? "Practice" : "Game"} ${tryoutgame_info.num + 1} of ${tryoutgame_info.amount}`);
    if (!dismissed_click_prompt) $('.clickprompt').show();
    if (tryoutgame_info.num == 0 && tryoutgame_info.startLevel > 0) {
        level = tryoutgame_info.startLevel;
    } else {
        level = (category - 1) * 40 + Math.floor(Math.random() * 40)
    }
    log_data_tryout({ "event_type": "start game", "event_info": { "game_num": tryoutgame_info.num, "is_practice": tryoutgame_info.practice, "level": level } })


    $("#close-button").show().css({ "display": "inline" })
    // create_board()
    // create_tryout_board()
    if (user_color == 0)
        user_tryout_move(tryoutgame_info)
    else
        make_user_opponent_tryout_move(tryoutgame_info)
}

function start_game(game_info) {
    if (!game_info.num) {
        game_info.num = 0;
        if (game_info.startCategory) category = game_info.startCategory;
    }
    $('#instructions').hide();
    $('.overlayed').hide();
    $('.gamecount').text(`${game_info.practice ? "Practice" : "Game"} ${game_info.num + 1} of ${game_info.amount}`);
    if (!dismissed_click_prompt) $('.clickprompt').show();
    if (game_info.num == 0 && game_info.startLevel > 0) {
        level = game_info.startLevel;
    } else {
        level = (category - 1) * 40 + Math.floor(Math.random() * 40)
    }
    log_data({ "event_type": "start game", "event_info": { "game_num": game_info.num, "is_practice": game_info.practice, "level": level } })
    create_board()
    create_tryout_board()
    if (user_color == 0)
        user_move(game_info)
    else
        make_opponent_move(game_info)

}

function adjust_level(result) {
    old_level = level
    if (result == 'win') {
        if (lastresult == 'win') {
            category = Math.min(category + 1, 5)
        }
    }
    if (result == 'opponent win')
        category = Math.max(category - 1, 1)
    lastresult = result
    log_data({ "event_type": "adjust level", "event_info": { "category": category } })
}

function end_tryout_game(game_info, result) {
    log_data_tryout({ "event_type": "end game", "event_info": { "game_num": game_info.num, "is_practice": game_info.practice, "result": result, "level": level } })
    // adjust_level(result) // Dont need to adjust level in the tryout board.
    /*
    $("#nextgamebutton").show().css({ "display": "inline" }).off("click").on("click", function () {
        $("#nextgamebutton").hide()
        user_color = (user_color + 1) % 2
        $(".canvas").empty();
        if (instructions[current_instruction_nr].games > 0) {
            instructions[current_instruction_nr].games--;
        }
        game_info.num++;
        if (game_info.num < game_info.amount)
            start_game(game_info)
        else {
            $('.headertext h1').text('');
            current_instruction_nr++;
            perform_instruction();
        }
    }) 
    */
}

function end_game(game_info, result) {
    log_data({ "event_type": "end game", "event_info": { "game_num": game_info.num, "is_practice": game_info.practice, "result": result, "level": level } })
    adjust_level(result)
    $("#nextgamebutton").show().css({ "display": "inline" }).off("click").on("click", function () {
        $("#nextgamebutton").hide()
        user_color = (user_color + 1) % 2
        $(".canvas").empty();
        // Dongjae tryout
        // emtpying canvas for tryout
        $(".tryout-canvas").empty()
        $('.popuptext h2').text('');
        if (instructions[current_instruction_nr].games > 0) {
            instructions[current_instruction_nr].games--;
        }
        game_info.num++;
        if (game_info.num < game_info.amount)
            start_game(game_info)
        else {
            $('.headertext h1').text('');
            current_instruction_nr++;
            perform_instruction();
        } show_last_move_tryout
    })
}

function perform_instruction() {
    // Finish the game when we run out of instructions
    if (current_instruction_nr >= instructions.length) {
        $('#instructions').hide();
        $('.overlayed').hide();
        finish_experiment();
        return;
    }
    log_data({ "event_type": "show instructions", "event_info": { "screen_number": current_instruction_nr } })
    // If the instruction is to play games then skip showing instructions
    if (instructions[current_instruction_nr].game_info) {
        start_game(instructions[current_instruction_nr].game_info);
        return;
    }
    $('.overlayed').show();
    $('#instructions').show();
    $('#instructions p').remove();
    $('#instructions h4').after("<p>" + (instructions[current_instruction_nr].text || "") + "</p>");
    if (instructions[current_instruction_nr].image) {
        $('#instructions img').show().attr("src", get_image_path(instructions[current_instruction_nr].image));
    } else {
        $('#instructions img').hide()
    }
    if (current_instruction_nr == 0) {
        $('#previousbutton').hide()
    }
    else {
        $('#previousbutton').show().off("click").on("click", function () {
            do { current_instruction_nr-- } while (current_instruction_nr > 0 && instructions[current_instruction_nr].games == 0);
            perform_instruction(current_instruction_nr);
        });
    }
    nextText = instructions[current_instruction_nr].nextButton || "Next";
    if (current_instruction_nr + 1 < instructions.length) {
        if (instructions[current_instruction_nr + 1].nextButton &&
            instructions[current_instruction_nr + 1].games != 0) {
            nextText = instructions[current_instruction_nr + 1].nextButton;
        }
    }
    $('#nextbutton').text(nextText);
    $('#nextbutton').off("click").on("click", function () {
        do { current_instruction_nr++ } while (current_instruction_nr < instructions.length && instructions[current_instruction_nr].games == 0);
        perform_instruction(current_instruction_nr);
    });
}

function enter_credentials(callback) {
    $('.overlayed').show();
    $('#credentials').show();
    $("#credentials_input [type=text]").bind("keydown", function (event) {
        $("#credentials_input [type=submit]").show()
    })
    $("#credentials_input [type=submit]").off("click").on("click", function () {
        $('.overlayed').hide();
        $('#credentials').hide();
        user_credentials = $("#credentials_input [type=text]").val()
        log_data({ "event_type": "credentials entered", "event_info": { "credentials": user_credentials } })
        // Dongjae tryout board
        log_data_tryout({ "event_type": "credentials entered", "event_info": { "credentials": user_credentials } })
        callback()
    })
}

function initialize_task(_num_games) {
    current_instruction_nr = 0;
    user_color = 0
    instructions = [
        {
            // 0
            text: "You will be playing a few games called 4-in-a-row against the computer"
        },
        {   // 1
            text: "In this game, you and the computer place black or white pieces on a game board",
            image: "black-about-to-win.png"
        },
        {   // 2
            text: "If you get 4 pieces in a row, you win!",
            image: "black-won.png"
        },
        {   // 3
            text: "You can connect your 4 pieces in any direction, left to right, up down, or tilted, they all count",
            image: "black-won-diagonal.png"
        },
        {   // 4
            text: "If the computer gets 4-in-a-row before you do, you lose"
        },
        {   // 5
            text: "If the board is full and no-one has 4-in-a-row, it's a tie",
            image: "draw.png"
        },
        {   // 6
            text: "If you were playing black pieces for one game, then the next game you will play white pieces. Let's play one game to see how it works, now you will play black"
        },
        {   // 7 
            game_info: {
                amount: 1,
                practice: true,
                startCategory: 1,
                startLevel: 1
            },
            tryoutgame_info: {
                amount: 1,
                practice: true,
                startCategory: 1,
                startLevel: 1
            },
            nextButton: "Practice"
        },
        {   // 8
            text: "You will now practice playing 4-in-a-row against the computer"
        },
        {   // 9
            game_info: {
                amount: _num_games,
                practice: false,
                startCategory: 2,
            },
            tryoutgame_info: {
                amount: _num_games,
                practice: false,
                startCategory: 2,
            },
            nextButton: "Start"
        },
        {   // 10
            text: "Thank you for playing! Almost done, you are about to enter the last task",
        }
    ]
}

function start_experiment() {
    makemove = Module.cwrap('makemove', 'number', ['number', 'string', 'string', 'number', 'number'])
    $(document).on("contextmenu", function (e) {
        e.preventDefault()
    })
    perform_instruction()
    // document.body.innerHTML = '<p> <center> Please wait. You will be redirected to the next task in 10 seconds. Please click "leave" when asked if you would like to leave this page. </center> </p>'

    // window.open("../twostep.html",'_self');
}

// function next_task() {
// 	$( document ).ready(function() {
// 	document.body.innerHTML = '<p> <center> Please wait. You will be redirected to the next task in 10 seconds. Please click "leave" when asked if you would like to leave this page. </center> </p>'

// 	window.open("../twostep.html",'_self');
// })
// }
