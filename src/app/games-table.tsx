import React from 'react';
import DataTable from 'react-data-table-component';
import Image from 'next/image';
import { Game } from './api/users/[user]/route';

interface GamesTableProps {
    games: Game[];
}

const GamesTable: React.FC<GamesTableProps> = ({ games }) => {
    const loader = ({ src }: { src: string }) => `http://media.steampowered.com/steamcommunity/public/images/apps/${src}.jpg`;

    return (
        <DataTable
            columns={[
                { width: "66px", cell: (game: Game) => <Image data-tag="allowRowEvents" width={32} height={32} src={`${game.appid}/${game.img}`} loader={loader} alt={`${game.name}'s app icon`} /> },
                { name: 'Game', selector: (game: Game) => game.name, sortable: true },
                { id: 'Playtime', name: 'Playtime (hours)', selector: (game: Game) => game.playtime, format: (g: Game) => (g.playtime / 60).toFixed(0), sortable: true, right: true },
            ]}
            data={games}
            pagination
            defaultSortAsc={false}
            defaultSortFieldId={'Playtime'}
            onRowClicked={(game: Game) => window.open(`https://store.steampowered.com/app/${game.appid}`)}
            pointerOnHover
            striped
        />
    );
};

export default GamesTable;
