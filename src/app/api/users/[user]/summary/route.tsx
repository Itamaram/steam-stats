import { getOwnedGames } from '@/steam/api';
import _ from 'lodash';
import { NextResponse } from 'next/server';

export async function GET(_request: Request, { params }: { params: { user: string } }) {
    const { user } = params;
    const { response } = await getOwnedGames(user);

    return NextResponse.json({
        totalOwned: response.game_count,
        totalPlayedTime: _.sumBy(response.games, g => g.playtime_forever) / 60,
        mostPlayed: _.minBy(response.games, g => -g.playtime_forever)?.name,
        games: _.map(response.games, g => ({ name: g.name, playtime: g.playtime_forever / 60 }))
    });
}