import {Request, Response} from 'express';

import db from '../database/connections';
import convertHourToMinutes from '../utils/convertHoursToMinutes';

interface ScheduleItem{
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController{
    /*index retorna lista*/
    async index(request: Request, response: Response){
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;
        

        if(!filters.week_day || !filters.subject || !filters.time){
            return response.status(400).json({
                error: 'Missing filters to search classes'
            });

        }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                  .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??',[Number(week_day)])
                    .whereRaw('`class_schedule`.`from`<= ??',[timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??',[timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

       return response.json(classes);
    }



    async create (request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body; /*pedindo dados no corpo da msg*/
        //promisse para não bugar o código*/
     
     const trx = await db.transaction();
     
     
        try{
            const insertedUsersId = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
         
            const user_id = insertedUsersId[0];
         
           const insertedClassesIds = await trx('classes').insert({
                subject,
                cost, 
                user_id
            });
         
            const class_id = insertedClassesIds[0];
         
            const classSchedule = schedule.map((scheduleItem: ScheduleItem)=>{
             
             return{
                     class_id,
                     week_day: scheduleItem.week_day,
                     from: convertHourToMinutes(scheduleItem.from),
                     to: convertHourToMinutes(scheduleItem.to)
                 };
         
            })
         
         
            await trx('class_schedule').insert(classSchedule);
                
            await trx.commit();
         
             return response.status(201).send();/*201 = criado com sucesso*/
        } catch (err) {
    
            await trx.rollback();
    
            console.log(err);
    
            return response.status(400).json({ /*400= bad request*/
                error: 'Unexpected error while creating a new class '
            })
        }
    };
}