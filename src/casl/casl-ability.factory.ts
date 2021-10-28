import { Injectable } from "@nestjs/common";
import { Ability, AbilityBuilder, InferSubjects, AbilityClass, ExtractSubjectType} from "@casl/ability";
import { Posts } from "../schemas/posts.schema";
import { User } from "../schemas/users.schema";
import { Action } from "../enum/action.enum";

type Subjects = InferSubjects<typeof Posts | typeof User> | 'all';

export type AppAbility = Ability<[Action,Subjects]>

@Injectable()
export class CaslAbilityFactory {
    createForUser(user : User){
        const {can, cannot, build} = new AbilityBuilder<Ability<[Action,Subjects]>>(Ability as AbilityClass<AppAbility>);

        if(user.isAdmin){
            can(Action.Manage,'all');
        }else{
            can(Action.Read,'all');
        }

        can(Action.Update, Posts, { userId :user._id});
        cannot(Action.Delete,Posts, {isPublished : true});

        return build({
            detectSubjectType: item =>item.constructor as ExtractSubjectType<Subjects>
        })
    }
}
